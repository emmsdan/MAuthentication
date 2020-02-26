import express from 'express';

import routes from '@settings/routes';
import {
  exceptionHandler,
  joiValidatorHandler,
  authorizedUser,
  authorizedAdminUser
} from '@middleware/validation';

import { joify } from '@middleware/datatype';
// import { UserSchema } from '@schema';
// import Response from '@response';

import AllUser, { getUserInfo, AllAdminUsers } from './user';
const USER = routes.USER;
export const autoPath = USER.path.toLowerCase();
const userRoute = express.Router();


/** ------------------ | get all admin (paginated) | --------------- **/
const emptySchema = joify({}, [], null);
userRoute.post(
  USER.FETCH_ADMINS,
  authorizedAdminUser,
  joiValidatorHandler(emptySchema),
  exceptionHandler(AllAdminUsers));

/** ------------------ | End of get all admin (paginated) | --------- **/

/** ------------------ | get all users (paginated) | --------------- **/
const usersSchema = joify({}, [['pageSize', 'number'], ['page', 'number']], null);
userRoute.post(
  USER.FETCH_ALL,
  joiValidatorHandler(usersSchema),
  authorizedUser,
  exceptionHandler(AllUser));

/** ------------------ | End of get all users (paginated) | --------- **/

/** ------------------ | get single user | --------------- **/
const userSchema = joify({}, [['username', 'string']], null);
userRoute.post(
  USER.FETCH,
  joiValidatorHandler(userSchema),
  exceptionHandler(getUserInfo));

/** ------------------ | End of get single user | --------- **/

export default userRoute;
