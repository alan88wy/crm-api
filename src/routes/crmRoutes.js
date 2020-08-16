import express from 'express';
import {
  addNewContact,
  getContacts,
  getContactWithID,
  updateContact,
  deleteContact,
} from '../controller/crmController';

import {
  login,
  registerUser,
  loginRequired
} from '../controller/userController';

const routes = (app) => {
  app.route('/contacts')
    .get((req, res, next) => {
        // Middleware
        console.log(`Request from: ${req.originalUrl}`);
        console.log(`Request type: ${req.method}`);
        next();
      },
      loginRequired, getContacts)
    // Save contact
    .post(loginRequired, addNewContact);

  // Get Contact by contact Id
  app.route('/contact/:contactID')
    .get(loginRequired, getContactWithID)
    // Update contact by Contact Id
    .put(loginRequired, updateContact)
    // Delete contact by Id
    .delete(loginRequired, deleteContact);

  // registration route

  app.route('/auth/register').post(registerUser);

  app.route('/login').post(login);
}

export default routes;
