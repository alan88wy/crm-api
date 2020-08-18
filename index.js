import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';

import routes from './src/routes/crmRoutes';

const app = express();
const PORT = 4000;

// Mongoose Connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/CRMdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// body-parser setup

app.use(helmet());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Setup rate limit

const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit no of request per IP
  delayMs: 0 // disable delays
});

app.use(limiter);

// JWT Setup

app.use((req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization
      .split(' ')[1], 'WhatEverThisIs',
      (err, decode) => {
        if (err) req.user = undefined;

        req.user = decode;
        next();
      });
  } else {
    req.user = undefined;
    next();
  }
});

routes(app);

// Serving Static files
app.use(express.static('public'));
app.use('/', routes);

app.get('/', (req, res) => {
  res.send(`Server running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
