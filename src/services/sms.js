require('dotenv').config();
import AWS from 'aws-sdk';
import isNumeric from 'validator/lib/isNumeric';

const __varifyInput = Symbol('__varifyInput');

/**
* @author EmmsDan <emmsdan.inc@gmail.com>
* @version 0.0.1
* @description Simple SMS service provider (AWS)
*/

/**
  await SMSService.send({ phone: '2348145467267', body: 'Hello EmmsDan'});
*/

class SMSService {
  config(config) {
    if (!this[__varifyInput](config)) {
      this.throwError();
    }
  }

  throwError() {
    throw Error(JSON.stringify({
      phone: 'should be a valid PhoneNumber',
      body: 'should be a valid string message body',
    }));
  }

  [__varifyInput]({ phone, body, sender, maxPage }) {
    this.__mxPage = maxPage || 1;
    this.__perPage = 159;
    this.__maxChar = 159 * this.__mxPage;
    const messageLength = body?.length <= this.__maxChar;
    if (isNumeric(phone) && messageLength) {
      this.__phone__ = phone;
      this.__message__ = body;
      this.__sender__ = sender || 'EmmsDan';
      return true;
    }
    return false;
  }

  async send(config) {
    try {
      if(!config && !this.__phone__ && !this.__message__) {
        return this.throwError();
      }else if(config) {
        this.config(config);
      }

      return await new AWS.SNS(
        { apiVersion: '2010-03-31' }
      ).publish({
        Message: this.__message__,
        PhoneNumber: '+' + this.__phone__,
        MessageAttributes: {
          'AWS.SNS.SMS.SenderID': {
            'DataType': 'String',
            'StringValue': this.__sender__
          }
        }
      }).promise();
    } catch (e) {
      return e.message;
    }
  }
}

export default new SMSService();
