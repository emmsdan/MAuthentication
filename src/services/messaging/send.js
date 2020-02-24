import NotificationService from '@service/notification';

export async function sendSms(user, req) {
  if (user.phone) {
    await NotificationService.subcribe(['sms']);
    const message = (`Hi ${user.name}.
      ${req.translate('resetPasswordToken')}  ${user.token}
      ${req.translate('resetPasswordLink')} ${user.url}`).toString();
    await NotificationService.broadCast(message, user);
  }
}

export async function sendEmail(user, req) {
  if (user.email) {
    await NotificationService.unsubcribe(['sms']);
    await NotificationService.subcribe(['email']);
    await NotificationService.broadCast({
      token: user.token,
      body: `${req.translate('helloGreeting')} ${user.name}, `,
      extend: req.translate('resetPasswordEmail'),
      btnText: 'RESET PASSWORD',
      btnUrl: user.url
    }, user);
  }
}
