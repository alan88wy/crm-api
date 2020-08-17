import mongoose from 'mongoose';
import validator from 'validator';
import {
  ContactSchema
} from '../models/crmModels';


const Contact = mongoose.model('Contact', ContactSchema);

export const addNewContact = (req, res) => {
  let newContact = new Contact(req.body);

  if (!validator.isEmpty(req.body.email))
    res.status(400).json({
      message: 'Invalid Email!'
    });

  if (!validator.isString(req.body.firstName) || !validator.isString(req.body.lastName))
    res.status(400).json({
      message: 'Invalid firstName or lastName!'
    });

  newContact.save((err, contact) => {
    if (err) {
      res.send(err);
    }

    res.json(contact);
  });
};

export const getContacts = (req, res) => {
  Contact.find({}, (err, contact) => {
    if (err) {
      res.send(err);
    }

    res.json(contact);
  });
};

export const getContactWithID = (req, res) => {
  Contact.findById(req.params.contactID, (err, contact) => {
    if (err) {
      res.send(err);
    }

    res.json(contact);
  });
};

export const updateContact = (req, res) => {

  if (!validator.isEmpty(req.body.email))
    res.status(400).json({
      message: 'Invalid Email!'
    });

  if (!validator.isString(req.body.firstName) || !validator.isString(req.body.lastName))
    res.status(400).json({
      message: 'Invalid firstName or lastName!'
    });

  Contact.findOneAndUpdate({
      _id: req.params.contactID
    },
    req.body, {
      new: true,
      useFindAndModify: false
    },
    (err, contact) => {
      if (err) {
        res.send(err);
      }

      res.json(contact);
    }
  );
};

export const deleteContact = (req, res) => {
  Contact.remove({
    _id: req.params.contactID
  }, (err, contact) => {
    if (err) {
      res.send(err);
    }

    res.json({
      message: 'Successfully deleted contact!'
    });
  });
};
