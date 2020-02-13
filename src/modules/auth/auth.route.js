import express from 'express';
// import NotificationService from '../../services/notification';
import { User } from '../../database/models';

const authRoute = express.Router();
export const autoPath = ''.toLowerCase();

authRoute.get('/', async (req, res) => {
  // console.log(User);
  // NotificationService.subcribe(['email']);
  // // await NotificationService.broadCast('Your friend just posted in the group', { email: 'emmsdan.inc@gmail.com', phone: '2348145467267'});
  // // NotificationService.ls();
  // console.log(await User.findAll())
  res.json(await User.findAll());
});

export default authRoute;
