import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

import {
  UserSchema
} from '../models/userModel';

const User = mongoose.model('User', UserSchema);

export const loginRequired = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    return res.status(401).json({
      message: 'Unauthorize user!'
    });
  }
}

export const registerUser = (req, res) => {

  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err) throw err;

    if (user) {
      res.status(401).json({
        message: 'User already registered!'
      });
    }
  });

  if (!validator.isEmpty(req.body.email))
    res.status(400).json({
      message: 'Invalid Email!'
    });

  if (!validator.isString(req.body.firstName) || !validator.isString(req.body.lastName))
    res.status(400).json({
      message: 'Invalid firstName or lastName!'
    });

  const newUser = new User(req.body);

  newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);

  newUser.save((err, user) => {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      user.hashPassword = undefined;
      return res.json(user);
    }

  });
};

export const login = (req, res) => {
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.status(401).json({
        message: 'Authentication failed. No User found!'
      });
    } else {
      if (user) {
        if (!user.comparePassword(req.body.password, user.hashPassword)) {
          res.status(401).json({
            message: 'Authentication failed. Wrong Password!'
          })
        } else {
          return res.json({
            token: jwt.sign({
              email: user.email,
              username: user.username,
              _id: user.id
            }, 'WhatEverThisIs')
          });
        }
      }
    }
  })
}
