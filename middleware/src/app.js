/* eslint-disable no-unused-vars */
const createError = require('http-errors');

const express = require('express');

const path = require('path');

const logger = require('morgan');

require('dotenv').config();

const cors = require('cors');

const usersRouter = require('./routes/userRouter');

const shopsRouter = require('./routes/shopRouter');

const itemsRouter = require('./routes/itemRouter');

const ordersRouter = require('./routes/orderRouter');

const favouritesRouter = require('./routes/favouriteRouter');

const corsOptions = {
  origin: true,

  methods: 'GET,POST,PUT,DELETE,OPTIONS',

  credentials: true,

  optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();

app.use(cors(corsOptions));

app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRouter);

app.use('/shops', shopsRouter);

app.use('/items', itemsRouter);

app.use('/orders', ordersRouter);

app.use('/favourites', favouritesRouter);

// catch 404 and forward to error handler

app.use((req, res, next) => {
  next(createError(404));
});

// error handler

app.use((err, req, res, next) => {
  console.log('in error handler');

  // set locals, only providing error in development

  res.locals.message = err.message;

  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 400).json({ error: err.message });
});

module.exports = app;
