const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('client-sessions');
const http = require('http');
const bodyParser = require('body-parser');

//IMPORTING ALL ROUTES
const index = require('./routes/index');
const register = require('./routes/register');
const login = require('./routes/login');
const secure = require('./routes/secure');
const newAd = require('./routes/newAd');
const myAd = require('./routes/myAd');
const search = require('./routes/search');
const contact = require('./routes/contact');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'slika2.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//SESSION INFORMATIONS
app.use(session({
	
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  
}));

//TELL APP TO USE THESE RUTES FOR THIS LINK(FIRST ARGUMENT)
app.use('/', index);
app.use('/register',register);
app.use('/login',login);
app.use('/secure',secure);
app.use('/newAd',newAd);
app.use('/myAd',myAd);
app.use('/search',search);
app.use('/contact',contact);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
  
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
