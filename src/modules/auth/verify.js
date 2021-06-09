import Response from '@response';

import UserService from '@service/user';
import AuthService from '@service/auth';
import { sendSms, sendEmail } from '@service/messaging/send';

import { activationLink, randomNumber } from '@utils/utils';

export async function ActivateAccount(req, res) {
  try {
    const getActive = await AuthService.findInactiveById(req.body.userId);
    if(!getActive || getActive.token !== req.body.token){
      return Response.error(res,
        405, req.translate('invalidCredentials'));
    }
    getActive.destroy();
    return Response.success(res,
      200, null, req.translate('activationSuccess'));
  } catch (e) {
    Response.error(res, 500, req.translate('serverError'));
  }
}

export async function VerifyToken(req, res) {
  try {
    const user  = await AuthService.findInactiveById(req.body.userId);
    if (user && user.token === req.body.token) {
      user.destroy();
      Response.success(res, 200, req.translate('validToken'));
    }
    Response.error(res, 406, req.translate('invalidToken'));
  } catch (e) {
    Response.error(res, 500, req.translate('serverError'));
  }
}

export async function ForgotPassword (req, res) {
  try {
    const where  = new UserService().whereObjectForGetUser('emmsdan.inc@gmail.com');
    const user = await new UserService().findOneRecord({ where: { ...where } }, null);
    const token = randomNumber().toString();
    const bit = await activationLink(user.id, token);

    if(user) {
      const activation = new AuthService(req.initiator);
      activation.ActionCreator.set({ id: user.email, name: user.name });
      await activation.createRecord({ userId: user.id, token });
      user.url = bit.url;
      user.token = token;
      Promise.all([sendSms(user, req), sendEmail(user, req)]);
    }
    Response.success(res, 200, req.translate('codeSentIfExist'));
  } catch (e) {
    Response.error(res, 500, req.translate('serverError'));
  }
}
