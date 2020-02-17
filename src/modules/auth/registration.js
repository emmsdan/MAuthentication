import UserService from '@service/user';
import settings from '@global_settings';

import { JWTStrategy } from '@utils/security';
import Response from '@response';

import { createActivation } from '@service/auth';

export async function Register(req, res) {
  try {
    const useri = new UserService(req.initiator);
    useri.ActionCreator.set({ id: req.body.email, name: req.body.name });
    const user = await useri.create(req.body);
    user.createPasswordManager({ currentPass: req.body.password });
    await createActivation(user, req);
    let token;
    if (!settings.allowAccountActivation) {
      const { id, updatedAt } = user;
      token = await JWTStrategy.sign({ id, updatedAt });
    }
    Response.success(
      res, 201,
      {user, token},
      req.translate('createAccountSuccess'));
  } catch (e) {
    Response.error(res, 500, req.translate('serverError'));
  }
}
