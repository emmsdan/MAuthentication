import { Op } from 'sequelize';
import isUUID from 'validator/lib/isUUID';

import { User } from '@models';
import * as Utils from '@utils/utils';
import DBModel from '@service/model';

/**
 * @description Handles Users connections to the database Model
 * @author EmmsDan
 * @version 0.2
 */

export default class UserService extends DBModel {
  constructor() {
    Utils.trace(__filename);
    super();
    this.model = User;
  }

  whereObjectForGetUser(id, userId='p') {
    const params = [
      { phone: [id, userId] },
      { email: [id, userId] },
    ];
    if(isUUID(id)) params.push({ id});

    if (isUUID(userId)) params.push({ id: userId });

    return {
      [Op.or]: [...params],
    };
  }

  /**
	 * Add new User Record to table
	 * @param {object} body contains object model for User to be added to the table
	 * */
  async create(body) {
    try {
      return await this.createRecord(
        { ...body }
      );
    } catch (error) {
      return Utils.DBErrorHandler(error);
    }
  }

  /**
	 * enable User's account
	 * @param {string} User contains User id (either phone, account number, contractPhone or id)
	 */
  static async updateUser(User) {
    try {
      return await new UserService().updateOneRecord({
        where: {
          ...new UserService().whereObjectForGetUser(User.UserId + ''),
        },
        body: User,
      });
    } catch (error) {
      return Utils.DBErrorHandler(error);
    }
  }

  /**
	 * Get an User by his id/accountNumber/contractPhone
	 * @param {string} id contains User information
	 */
  static async findUserById(id, exclude = null) {
    try {
      return await new UserService().findOneRecord({
        where: { id }, attributes: { exclude }
      });
    } catch (error) {
      return Utils.DBErrorHandler(error);
    }
  }

}
