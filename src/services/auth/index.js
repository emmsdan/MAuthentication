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
    if (user.phone) {
      await NotificationService.subcribe(['sms']);
    }
    if (user.email) {
      await NotificationService.subcribe(['email']);
    }

    const message = `
    <html>
      <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        </head>
        <div class="row justify-content-center">
          <div class="card text-center" style="width: 18rem;">
            <div class="card-body">
              ${req.translate('helloGreeting')} ${user.name}, <br/> </br>
            <h6 class="card-subtitle mb-2 text-muted">
              ${req.translate('createdAccountEmail')}
            </h6>

            <h2 class="card-title"> code: <i style="color: #3c63f7">${token}</i> </h2>
            <a href="${bit.url}" class="btn btn-outline-success btn-lg"> ACTIVE NOW </a>
          </div>
        </div>
      </div>
    </html>
    `;
    await NotificationService.broadCast(message, user);
  }
}
