import express from 'express';

import routes from '@settings/routes';
import { UserSchema } from '@schema';
// import Response from '@response';
// import AuthService from '@service/auth';

import { exceptionHandler, joiValidatorHandler, validateExistingUser } from '@middleware/validation';
import { DataTypes, joify } from '@middleware/datatype';

import Register, { ActivateAccount } from './registration';
import Login from './login';
// import EmailService from '@service/messaging/email';

const AUTH = routes.AUTHENTICATION;
export const autoPath = AUTH.path.toLowerCase();

const authRoute = express.Router();


/** ------------------ | Register account | --------------- **/
const signupSchema = joify(UserSchema(DataTypes), [['password', 'string']], null);
authRoute.post(
  AUTH.SIGNUP,
  joiValidatorHandler(signupSchema),
  validateExistingUser,
  exceptionHandler(Register));

/** ------------------ | End of Register Account | --------- **/


/** ------------------ | Account Login | --------------- **/

const activationSchema = joify({}, [
  ['userId', 'string'],['token', 'string']
], null);
authRoute.post(
  AUTH.VERIFYACCOUNT,
  joiValidatorHandler(activationSchema),
  exceptionHandler(ActivateAccount));

/** ------------------ | End of Account Login | --------- **/

/** ------------------ | Account Login | --------------- **/

const loginSchema = joify({}, [
  ['username', 'string'],['password', 'string']
], null);
authRoute.post(
  AUTH.LOGIN,
  joiValidatorHandler(loginSchema),
  validateExistingUser,
  exceptionHandler(Login));

/** ------------------ | End of Account Login | --------- **/

export default authRoute;
