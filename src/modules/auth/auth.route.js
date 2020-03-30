import express from 'express';

import routes from '@settings/routes';
import { UserSchema } from '@schema';
// import Response from '@response';
// import AuthService from '@service/auth';
import { trace } from '@utils/utils';

import { exceptionHandler, joiValidatorHandler, validateExistingUser } from '@middleware/validation';
import { DataTypes, joify } from '@middleware/datatype';

import Register, { ChangePassword } from './registration';
import Login from './login';
import { ActivateAccount, VerifyToken, ForgotPassword } from './verify';

const AUTH = routes.AUTHENTICATION;
export const autoPath = AUTH.path.toLowerCase();

const authRoute = express.Router();

trace(__filename);
/** ------------------ | Register account | --------------- **/
const signupSchema = joify(UserSchema(DataTypes), [['password', 'string']], null);
authRoute.post(
  AUTH.SIGNUP,
  joiValidatorHandler(signupSchema),
  validateExistingUser,
  exceptionHandler(Register));

/** ------------------ | End of Register Account | --------- **/


/** ------------------ | Account Activation | --------------- **/

const activationSchema = joify({}, [
  ['userId', 'string'],['token', 'string']
], null);
authRoute.post(
  AUTH.VERIFYACCOUNT,
  joiValidatorHandler(activationSchema),
  exceptionHandler(ActivateAccount));

/** ------------------ | End of Account Activation | --------- **/


/** ------------------ | Forgot Password | --------------- **/

const forgotPasswordSchema = joify({}, [
  ['username', 'string']
], null);
authRoute.post(
  AUTH.FORGOTPASSWORD,
  joiValidatorHandler(forgotPasswordSchema),
  exceptionHandler(ForgotPassword));

/** ------------------ | End of Forgot Password | --------- **/


/** ------------------ | Account Token Verification | --------------- **/

authRoute.post(
  AUTH.VERIFYTOKEN,
  joiValidatorHandler(activationSchema),
  exceptionHandler(VerifyToken));

/** ------------------ | End of Token Verification | --------- **/


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


/** ------------------ | Account Token Verification | --------------- **/

authRoute.post(
  AUTH.CHANGEPASSWORD,
  joiValidatorHandler(loginSchema),
  validateExistingUser,
  exceptionHandler(ChangePassword));

/** ------------------ | End of Token Verification | --------- **/

export default authRoute;
