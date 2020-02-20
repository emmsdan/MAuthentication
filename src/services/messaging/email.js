import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import {TwingEnvironment, TwingLoaderFilesystem} from 'twing';


import { socialMedia, logo } from '@global_settings';

/**
* @author EmmsDan <emmsdan.inc@gmail.com>
* @version 0.0.1
* @description Simple SMS service provider (AWS)
*/

/**
* -------------------------- Basic Usage
  const email = new EmailService({ user, pass, service });
    from: '"Fred Foo 👻" <me@example.com>', // sender address
    to: 'you@example.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
  }),
  email.getError())
*/

class EmailService {
  constructor({ user=process.env.SMTP_USER || '', pass=process.env.SMTP_PASS || '', service='SendGrid', transport = null }) {
    this.__username = user;
    this.__password = pass;
    this.__otherTransport = transport;
    this.__client = transport
      || nodemailer.createTransport( this.getServiceTypeAuth(service));

    this.__templateDir = 'src/static/template/email';

    const loader = new TwingLoaderFilesystem(this.__templateDir);
    this.__twing = new TwingEnvironment(loader);
  }

  async send(mailOptions){
    try {
      const from = `'"${process.env.EMAIL_SENDER_NAME} 👻" <${process.env.EMAIL_SENDER}>'`;
      const html = this.__emailMessage || mailOptions.html;
      const sentMail = await this.__client.sendMail({...mailOptions, from, html });
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

  async useEmailTemplate(fields, template='registration') {
    if (!fields || !template) {
      return 'Specify a template and field params.';
    }
    try {
      this.__emailMessage = await this.__twing.render(template + '.html', fields);
    } catch (e) {
      return e.message;
    }
  }

  getField(fields) {
    return { ...logo, ...socialMedia, ...fields };
  }
}

export default EmailService;
