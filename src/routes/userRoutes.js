import {
  addNewUser,
  getUsers,
  getUserWithID,
  updateUser,
  deleteUser
} from '../controllers/user.controller';

const routes = (app) => {
  app.route('/user')
    .get((req, res, next) => {
      // middleware
      console.log(`Request from: ${req.originalUrl}`)
      console.log(`Request type: ${req.method}`)
      next();
    }, loginRequired, getUsers)

    // POST endpoint
    .post(loginRequired, addNewUser);

  app.route('/user/:userId')
    // get specific contact
    .get(loginRequired, getUserWithID)

    // put request
    .put(loginRequired, updateUser)

    // delete request
    .delete(loginRequired, deleteUser);

  // registration route

  app.route('/auth/register').post(register);

  app.route('login').post(login);
}

export default routes;
