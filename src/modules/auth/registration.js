import UserService from '@service/user';
import settings from '@global_settings';

import { JWTStrategy } from '@utils/security';
import Response from '@response';

import AuthService from '@service/auth';
import { PasswordManager } from '@models';
const encryptor = require('@utils/encryptor');

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
    delete user.isAdmin;

    Response.success(
      res, 201,
      { user, token },
      req.translate('createAccountSuccess'));
  } catch (e) {
    Response.error(res, 500, req.translate('serverError'));
  }
}

export async function ChangePassword(req, res) {
  try {
    if (!req.dbUser) {
      return Response.success(res, 200, '', req.translate('invalidCredentials'));
    }
    const { id } = req.dbUser;
    const { password } = req.body;

    const pass = new AuthService(req.initiator);
    pass.ActionCreator.set({ id: req.dbUser.email, name: req.dbUser.name });
    const passwordManager = await PasswordManager.update({
      currentPass: await encryptor.hash(password)
    }, { where: { userId: id  }});
    Response.success(res, 200, '', passwordManager);
  } catch (e) {
    Response.error(res, 200, '', e);
  }
}
