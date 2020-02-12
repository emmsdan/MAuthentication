import { uuid } from 'uuidv4';

import errorCodeFile from '../bin/error.json';

import EmailService from './email';
import SMSService from './sms';

/**
* @author EmmsDan <emmsdan.inc@gmail.com>
* @version 0.0.1
* @description Simple but effective notification service
*/

/**
*-------------- Usage -----------
* @const notify = new NotificationService({
    errorCodes: object [optional],
    broadCastModules: {
      smsModule: function(phone, message),
      emailModule: function (email, subject, body),
      inAppModule: function (message)
    } [optional],
    broadCastModulesSettings: {
      emailApi: apikey (uses sendgrid) [optional],
      emailModule: { email, password } [optional] // not recommended,
      sms
    }
* });
*
* for using our smsModule please, specify the following environmental variables
* AWS_ACCESS_KEY_ID=iam-access-key
* AWS_SECRET_ACCESS_KEY=your-iam-secret-key
* AWS_REGION=your-region
*/
const __errorCode = Symbol('__errorCode');
const __broadCastModules = Symbol('__broadCastModules');

class NotificationService {
  constructor({ errorCodes, broadCastModules }) {
    this.__subscribedService = new Set();
    this.__channel = new Set(['sms', 'email', 'in-app']);
    this.__transactionId = uuid();
    this[__errorCode] = errorCodes || errorCodeFile;
    this[__broadCastModules] = broadCastModules || this;
    this.__mail = new EmailService({ user: process.env.SMTP_USER, pass: process.env.SMTP_PASS });
  }

  getSubcribedServices() {
    return [...this.__subscribedService];
  }

  subcribe(channels, cb = () => {}){
    try {
      if(!Array.isArray(channels)){
        throw Error('Invalid ');
      }
      let addedCount = 0;
      for(let channel of channels) {
        if (this.__channel.has(channel)) {
          this.__subscribedService.add(channel);
          addedCount++;
        }
      }
      cb(
        addedCount ? this[__errorCode].failedUpdate : null, this.getSubcribedServices()
      );
      return this.getSubcribedServices();
    } catch (e) {
      return e;
    }
  }

  async broadCast(message, user=null) {
    if (!user || !message) return Error(this[__errorCode].invalidUser);
    for (let channel of this.getSubcribedServices()) {
      await this[channel](message, channel !== 'sms' ? user.email : user.phone);
    }
  }

  async ['email'](message, email) {
    const sent = await this.__mail.send({
      to: email,
      subject: message.split('').splice(0, 20).join('') + '...',
      html: `<h1> EmmsDan Notification</h1> <p> ${message} </p>`
    });
    return (sent === 'message' ? sent : this.__mail.getError());
  }

  async ['sms'](message, phone) {
    await SMSService.send({ phone, body: message});
  }

  ls() {
    return this;
  }
}

export default new NotificationService({});
