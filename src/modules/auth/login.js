import Response from '@response';

import { JWTStrategy } from '@utils/security';
import encryptor from '@utils/encryptor';


export default async function Login(req, res) {
  try {
    if (!req.dbUser)
      Response.error(res, 404, req.translate('invalidCredentials'));

    const password = await req.dbUser.getPasswordManager();
    const curr = await encryptor.compare(
      req.body.password, password.currentPass);

    if (curr) {
      const { id, updatedAt } = req.dbUser;
      const token = await JWTStrategy.sign({ id, updatedAt });
      Response.success(
        res, 200,
        { user: req.dbUser, token }, req.translate('invalidCredentials'));
    }
    Response.error(res, 404, req.translate('invalidCredentials'));
  } catch (e) {
    Response.error(res, 500, req.translate('serverError'));
  }
}
