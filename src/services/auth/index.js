import { Op } from 'sequelize';

import { Activation, PasswordManager } from '@models';
import * as Utils from '@utils/utils';
import DBModel from '@service/model';

import { activationLink, randomNumber } from '@utils/utils';
import NotificationService from '@service/notification';

/**
 * @description Handles Users connections to the database Model
 * @author EmmsDan
 * @version 0.2
 */

export default class AuthService extends DBModel {
  constructor() {
    super();
    this.model = Activation;
    this.model_password = PasswordManager;
  }

  /**
	 * update auth related tables
	 * @param {string} data contains update data
	 */
  static async updateAuth(data, type='activation') {
    try {
      this.model = (type !== 'activation') ? this.model_password : this.model;
      return await new AuthService().updateOneRecord(data);
    } catch (error) {
      return Utils.DBErrorHandler(error);
    }
  }

  /**
	 * Get an inactive User by his id/accountNumber/contractPhone
	 * @param {string} id contains User information
	 */
  static async findInactiveById(id, exclude = null) {
    try {
      return await new AuthService().findOneRecord({
        where: { userId: id, [Op.not]: { token: false } },
        attributes: { exclude }
      }, null);
    } catch (error) {
      return Utils.DBErrorHandler(error);
    }
  }

  /**
  * create activation
	* @param {db object} user contains User information
  * @param {express request object} request object
  */
  static async createActivation (user, req) {
    const token = randomNumber().toString();
    await user.createActivation({ token });
    const bit = await activationLink(user.id, token);

    async function sendSms() {
      if (user.phone) {
        await NotificationService.subcribe(['sms']);
        const message = (`Hi ${user.name}.
          ${req.translate('createdAccountCodeSMS')}  ${token}
          ${req.translate('createdAccountURLSMS')} ${bit.url}`).toString();
        await NotificationService.broadCast(message, user);
      }
    }

    async function sendEmail() {
      if (user.email) {
        await NotificationService.unsubcribe(['sms']);
        await NotificationService.subcribe(['email']);
        await NotificationService.broadCast({
          token,
          body: `${req.translate('helloGreeting')} ${user.name}, `,
          extend: req.translate('createdAccountEmailSMS'),
          btnText: 'VERIFY YOUR ACCOUNT',
          btnUrl: bit.url
        }, user);
      }
    }
    return Promise.all([sendSms(), sendEmail()]);
  }
}
