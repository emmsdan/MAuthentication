import * as Utils from '@utils/utils';
import Model from '@models';
import ActionCreator from '@service/initiator';
import Lang from '@lang';
import { authSettings as authHeaderSettings } from '@settings/auth';

/**
 * @description Handles connections to the database Model
 * @author EmmsDan
 * @version 0.2
 */

export default class DBModel {
  /**
     * Add create new Record in the table
     * @param {object} model model to use for adding record
     * @param {object} iObject contains object model for agent to be added to the table
     */
  constructor(actionCreator=null) {
    this.ActionCreator = actionCreator || ActionCreator;
  }

  async createRecord(iObject, transaction=null) {
    try {
      Utils.isObject(iObject, Lang.t('INVALID_TABLE_MODEL'));
      const record = await this.model.create(iObject, transaction);
      await this.set({ tableId: record.id, action: 'create' });
      return record;
    } catch (error) {
      throw Utils.DBErrorHandler(error);
    }
  }

  async findOneRecord(whereObject, initiate = true) {
    try {
      const { where, attributes = '', others } = whereObject;
      Utils.isObject(whereObject, Lang.t('INVALID_TABLE_MODEL'));
      const record = await this.model.findOne({ where, attributes, ...others });
      if (!record) return false;
      return initiate ? await this.set({
        tableId: record.id,
        action: 'get'
      }): record ;
    } catch (error) {
      throw Utils.DBErrorHandler(error);
    }
  }

  async findOneRecordNoTrace(where) {
    try {
      Utils.isObject(where, Lang.t('INVALID_TABLE_MODEL'));
      return await this.model.findOne(where);
    } catch (error) {
      throw Utils.DBErrorHandler(error);
    }
  }

  async findAllRecord(whereObject) {
    try {
      const { where, attributes=null, others } = whereObject;
      delete whereObject.initiator;
      Utils.isObject(whereObject, Lang.t('INVALID_TABLE_MODEL'));
      const record = await this.model.findAll({ attributes, ...others, where: {...where } });
      await this.set({ tableId: 'pending', action: 'get' });
      return record;
    } catch (error) {
      throw Utils.DBErrorHandler(error);
    }
  }

  async set({ action, tableId }, transaction=null) {
    const { id, name,  } = this.ActionCreator.get();
    const appId = {};
    appId[authHeaderSettings.header.database.name] = this.ActionCreator.get()[authHeaderSettings.header.database.name];
    return await Model.Initiator.create({
      refTableId: tableId,
      refTable: this.model.name,
      initiatorId: id,
      initiatorName: name,
      action: action,
      ...appId
    }, {transaction});
  }

  async updateOneRecord({ body, where, attributes = null }) {
    try {
      Utils.isObject(where, Lang.t('INVALID_TABLE_MODEL'));
      Utils.isObject(body, Lang.t('INVALID_TABLE_MODEL'));

      await this.model.update(body, { where });
      const record = await this.model.findOne({ where, attributes });
      await this.set({ tableId: record.id, action: 'update' });
      return record;
    } catch (error) {
      Utils.DBErrorHandler(error);
      return false;
    }
  }
}
