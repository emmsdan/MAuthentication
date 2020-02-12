import express from 'express';
import NotificationService from '../../services/notification';

const authRoute = express.Router();
export const autoPath = ''.toLowerCase();

authRoute.get('/', async (req, res) => {
  NotificationService.subcribe(['email']);
  // await NotificationService.broadCast('Your friend just posted in the group', { email: 'emmsdan.inc@gmail.com', phone: '2348145467267'});
  // NotificationService.ls();
  res.json('holla');
});

export default authRoute;
