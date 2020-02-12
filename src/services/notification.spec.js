require('dotenv').config();
import mockery from 'mockery';
import nodemailerMock from 'nodemailer-mock';

describe('tests that send email',  () => {
  let email = null;
  beforeEach(async ()  => {
    mockery.enable({
      warnOnUnregistered: false,
    });
    await mockery.registerMock('nodemailer', nodemailerMock);
    const transport = nodemailerMock.createTransport({
      host: '127.0.0.1',
      port: -100,
    });
    const { default: EmailService } = require('./email');
    email = await new EmailService({ transport });

  });

  afterEach(async () => {
    await nodemailerMock.mock.reset();
  });

  afterAll(async () => {
    mockery.deregisterAll();
    mockery.disable();
  });

  it('should send an email using nodemailer-mock', async () => {
    const request = {
      to: 'no_example@io.io',
      subject: 'fake subject',
      html: '<h3> Hello </h3>'
    };
    await email.send(request);
    const response = nodemailerMock.mock.getSentMail();
    expect(response[0]).toMatchObject(request);
  });
});
