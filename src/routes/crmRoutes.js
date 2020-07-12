import express from 'express';
import {
    addNewContact,
    getContacts,
    getContactWithID,
    updateContact,
    deleteContact,
} from '../controller/crmController';

const crmRouter = express.Router();

// Get list of contacts
crmRouter.get(
    '/contact',
    (req, res, next) => {
        // Middleware
        console.log(`Request from: ${req.originalUrl}`);
        console.log(`Request type: ${req.method}`);
        next();
    },
    getContacts
);
// Save contact
crmRouter.post('/contact', addNewContact);

// Get Contact by contact Id
crmRouter.get('/contact/:contactID', getContactWithID);
// Update contact by Contact Id
crmRouter.put('/contact/:contactID', updateContact);
// Delete contact by Id
crmRouter.delete('/contact/:contactID', deleteContact);

module.exports = crmRouter;
