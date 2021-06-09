import Joi from '@hapi/joi';

import Response from '@response';
import UserService from '@service/user';
import routes from '@settings/routes';
import { JWTStrategy } from '@utils/security';
import { authSettings } from '@global_settings';

const AUTH = routes.AUTHENTICATION;

export const joiValidatorHandler = (schema) => async (req, res, next) => {
  try {
    const header = req.headers[authSettings.header.appAuthID.name] || '';
    if (!header || header.search(authSettings.header.appAuthID.value) === -1) {
      throw Error('Could not authenticate App');
    }
    req.body =  await Joi.object(schema).validateAsync({
      ...req.params,
      ...req.body,
      ...req.query,
    });
    req.body[authSettings.header.database.name] = header;
    next();
  } catch (error) {
    Response.error(res, 422, error.message);
  }
};

export const exceptionHandler = (modules) => async (req, res, next) => {
  try {
    return await modules(req, res, next);
  } catch(error) {
    // eslint-disable-next-line
    console.log('A serious error exception happened.', error.message);
    Response.error(res, 500, error);
  }
};

export const validateExistingUser = async (req, res, next) => {
  const id = req.body.email || req.body.userId;
  const userId =  req.body.phone || req.body.username;
  const where  = new UserService().whereObjectForGetUser(id + '' || 'e', userId + '' );
  const user = await new UserService().findOneRecord({ where: { ...where } }, null);
  if(user && (req.url.search(AUTH.LOGIN) === -1) && (req.url.search(AUTH.VERIFYACCOUNT) === -1) && (req.url.search(AUTH.CHANGEPASSWORD) === -1)) {
    return Response.error(res, 409, req.translate('userExist'));
  }
  if (user) {
    req.dbUser = user;
  }
  next();
};

export const authorizedUser = async (req, res, next) => {
  const Authorization = req.headers.authorization.split(' ');
  try {
    const verify = await JWTStrategy.verify(Authorization[1]);

    const user = await new UserService()
      .findOneRecord({ where: { id: verify.id } }, null);
    if (!user) {
      return Response.error(res, 401, req.translate('UnauthorizedUser1'));
    }
    req.dbUser = user;
    next();
  } catch (e) {
    return Response.error(res, 401, req.translate('UnauthorizedUser'));
  }
};

export const authorizedAdminUser = async (req, res, next) => {
  const Authorization = req.headers.authorization.split(' ');
  try {
    const verify = await JWTStrategy.verify(Authorization[1]);
    if(Authorization[0] !== 'Bearer' || !verify.isAdmin) {
      return Response.error(res, 403, req.translate('NotPermitted'));
    }

    const user = await new UserService()
      .findOneRecord({ where: { id: verify.id } }, null);
    if (!user) {
      return Response.error(res, 401, req.translate('UnauthorizedUser1'));
    }
    req.dbUser = user;
    next();
  } catch (e) {
    return Response.error(res, 401, req.translate('UnauthorizedUser'));
  }
};
