import { activationLink, randomNumber } from '@utils/utils';
import NotificationService from '@service/notification';

export const createActivation = async (user, req) => {
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
};
