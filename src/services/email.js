import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';


/**
* @author EmmsDan <emmsdan.inc@gmail.com>
* @version 0.0.1
* @description Simple SMS service provider (AWS)
*/

/**
* -------------------------- Basic Usage
  const email = new EmailService({ user, pass, service });
  console.log(await email.send({
    from: '"Fred Foo 👻" <me@example.com>', // sender address
    to: 'you@example.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
  }),
  email.getError())
*/

class EmailService {
  constructor({ user, pass, service='SendGrid', transport = null }) {
    this.__username = user;
    this.__password = pass;
    this.__otherTransport = transport;
    this.__client =  transport
      || nodemailer.createTransport( this.getServiceTypeAuth(service));
  }

  async send(mailOptions){
    try {
      const from = `'"${process.env.EMAIL_SENDER_NAME} 👻" <${process.env.EMAIL_SENDER}>'`;
      const sentMail = await this.__client.sendMail({...mailOptions, from });
      return sentMail.message;
    } catch (error) {
      this.setError(error);
    }
  }

  setError(error) {
    this.__error = error;
  }

  getError() {
    return this.__error;
  }

  getServiceTypeAuth(service='SendGrid') {
    const services = {
      'SendGrid': sgTransport({
        auth: {
          api_user: this.__username,
          api_key: this.__password
        }
      }),
      'gmail': {
        service: 'gmail',
        auth: {
          user: this.__username,
          pass: this.__password
        }
      },
      'other': this.__otherTransport
    };
    return services[service];
  }
}

export default EmailService;
