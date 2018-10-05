const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');


//Config imports
require('./configs/db.config');
require('./configs/passport.config').setup(passport);

//Routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users.route');
const sessionsRouter = require('./routes/sessions.route');
const vehiclesRouter = require('./routes/vehicles.route');
const commutesRouter = require('./routes/commutes.route');
const scoresRouter = require('./routes/scores.route');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.COOKIE_SECRET || 'Super Secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 1367800020
  }
}));
app.use(passport.initialize());
app.use(passport.session());

//Routing
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sessions', sessionsRouter);
app.use('/commutes/', commutesRouter);
app.use('/scores', scoresRouter);
app.use('/users/:userId/vehicles', vehiclesRouter);


app.use(function (req, res, next) {
    next(createError(404));
  });

app.use(function (error, req, res, next) {
    console.error(error);
    res.status(error.status || 500);
  
    const data = {}
  
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400);
      for (field of Object.keys(error.errors)) {
        error.errors[field] = error.errors[field].message
      }
      data.errors = error.errors
    } else if (error instanceof mongoose.Error.CastError) {
      error = createError(404, 'Resource not found')
    }
  
    data.message = error.message;
    res.json(data);
  });

module.exports = app;
