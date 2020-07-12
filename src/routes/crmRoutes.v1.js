import {
    addNewContact,
    getContacts,
    getContactWithID,
    updateContact,
    deleteContact,
} from '../controller/crmController';

const routes = (app) => {
    app.route('/contact')
        // Get list of contacts
        .get((req, res, next) => {
            // Middleware
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request type: ${req.method}`);
            next();
        }, getContacts)
        // Save contact
        .post(addNewContact);

    app.route('/contact/:contactID')
        // Get Contact by contact Id
        .get(getContactWithID)
        // Update contact by Contact Id
        .put(updateContact)
        // Delete contact by Id
        .delete(deleteContact);
};

export default routes;
