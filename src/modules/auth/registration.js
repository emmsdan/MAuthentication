import UserService from '@service/user';
import settings from '@global_settings';

import { JWTStrategy } from '@utils/security';
import Response from '@response';

import AuthService from '@service/auth';

export default async function Register(req, res) {
  try {
    const useri = new UserService(req.initiator);
    useri.ActionCreator.set({ id: req.body.email, name: req.body.name });
    const user = await useri.create(req.body);
    user.createPasswordManager({ currentPass: req.body.password });
    await AuthService.createActivation(user, req);
    let token;
    if (!settings.allowAccountActivation) {
      const { id, updatedAt } = user;
      token = await JWTStrategy.sign({ id, updatedAt });
    }
    Response.success(
      res, 201,
      { user, token },
      req.translate('createAccountSuccess'));
  } catch (e) {
    Response.error(res, 500, req.translate('serverError'));
  }
}

export async function ActivateAccount(req, res) {
  try {
    const getActive = await AuthService.findInactiveById(req.body.userId);
    if(!getActive || getActive.token !== req.body.token){
      return Response.error(res,
        405, req.translate('invalidCredentials'));
    }
    getActive.token = false;
    getActive.save();
    return Response.success(res,
      200, null, req.translate('activationSuccess'));
  } catch (e) {
    Response.error(res, 500, req.translate('serverError'));
  }
}
