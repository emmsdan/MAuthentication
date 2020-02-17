import express from 'express';

import { UserSchema } from '@schema';

import { exceptionHandler, joiValidatorHandler, validateExistingUser } from '@middleware/validation';
import { DataTypes, joify } from '@middleware/datatype';

import { Register } from './registration.js';

export const autoPath = 'auth'.toLowerCase();

const authRoute = express.Router();

/** ------------------ | Register account | --------------- **/

const signupSchema = joify(UserSchema(DataTypes), [['password', 'string']], null);
authRoute.post(
  '/register',
  joiValidatorHandler(signupSchema),
  validateExistingUser,
  exceptionHandler(Register));

/** ------------------ | End of Register Account | --------- **/

export default authRoute;
