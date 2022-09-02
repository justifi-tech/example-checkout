var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var paymentRouter = require('./payment');
var app = express();
const config = require(process.env.CONFIG_PATH || '../src/config.json');
var { iframeOrigin, appDomain } = config;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));

// Allow checkout to be iframed
app.use(function (req, res, next) {
  res.setHeader('Accept', 'application/json');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-requested-with');
  // make these env specific
  res.setHeader('Access-Control-Allow-Origin', appDomain);
  res.setHeader('Content-Security-Policy', `frame-src 'self' ${iframeOrigin}`);
  next();
});

// endpoint for health
app.get('/health', (req, res) => {
  res.send('Ok!')
});

// serve react app build directory
app.use(express.static(path.join(__dirname, '../build')));

// endpoint for posting payments
app.use('/payment', paymentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
