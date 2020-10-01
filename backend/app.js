var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');             // getting the passport module
var config = require('./config');       // getting the config data
var authenticate = require('./authenticate');   // getting the authectiation strategy

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



// Getting the mongoose ODM 
const mongoose = require('mongoose');
//const Dishes = require('./models/dishes'); // get the dishes model which we make using schemas

const url = config.mongoUrl; // getting the url from the config file
const connect = mongoose.connect(url);

// connecting the mongodb server
connect.then((db) => {
  console.log("Connected correctly to the database");
}, (err) => { console.log("Error is: ", err); }); 
// this is the another way of showing the error instead of using catch


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// so this middleware will set the user property which is session at request
// so the further it is available in request for use
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
