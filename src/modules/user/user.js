import Response from '@response';

import UserService from '@service/user';

export default async function AllUser(req, res) {
  try {
    const offset = req.body.page * req.body.pageSize;
    const limit = req.body.pageSize;
    const users = await new UserService();
    await users.ActionCreator.set({ id: req.dbUser.email, name: req.dbUser.name });
    const getUsers = await users.findAllRecord({
      where: {},
      others: {
        limit, offset, attributes: {
          exclude: ['isAdmin']
        }, order: [['updatedAt','ASC']]
      }
    });
    return Response.success(res, 200, getUsers );
  } catch (e) {
    Response.error(res, 500, req.translate('serverError'));
  }
}

export async function AllAdminUsers(req, res) {
  try {
    const users = await new UserService();
    await users.ActionCreator.set({ id: req.dbUser.email, name: req.dbUser.name });
    const getUsers = await users.findAllRecord({
      where: { isAdmin: true },
      others: {  order: [['updatedAt','ASC']] }
    });
    return Response.success(res, 200, getUsers, '' );
  } catch (e) {
    Response.error(res, 500, req.translate('serverError'));
  }
}

export async function getUserInfo(req, res) {
  try {

    const where  = new UserService().whereObjectForGetUser(req.body.username  + '');
    const user = await new UserService().findOneRecord({ where: { ...where } }, null);
    if (user) {
      return Response.success(res, 200, user );
    }
    return Response.error(res, 404, req.translate('userDoesNotExist') );
  } catch (e) {
    Response.error(res, 500, req.translate('serverError'));
  }
}
