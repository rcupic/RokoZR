const express = require('express');
const path = require('path');
const http = require('http');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('client-sessions');
const bodyParser = require('body-parser');
const config = require('config').get('development');

const index = require('./routes/index');
const secure = require('./routes/secure');
const register = require('./routes/register');
const ads = require('./routes/ads');
const search = require('./routes/search');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'slika2.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  resave: false,
  saveUninitialized: false,
  activeDuration: 5 * 60 * 1000,
  cookie: {
    httpOnly: false,
    maxAge: null
  }
}));

app.use('/',index);
app.use('/secure',secure);
app.use('/register',register);
app.use('/ads',ads);
app.use('/search',search);
app.use('/logout',(req,res) => {
  req.session.user = null;
  res.redirect('/');
});

app.set('port', config.server.port);
const server = http.createServer(app);
server.listen(config.server.port);