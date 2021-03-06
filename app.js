var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var engine = require('ejs-locals');
var moment = require('moment');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));
app.use('/benhnhan', express.static(path.join(__dirname, 'public')));
app.use('/benhnhan/sua', express.static(path.join(__dirname, 'public')));
app.use('/loaibenh/sua', express.static(path.join(__dirname, 'public')));
app.use('/donvi/sua', express.static(path.join(__dirname, 'public')));
app.use('/cachdung/sua', express.static(path.join(__dirname, 'public')));
app.use('/thuoc', express.static(path.join(__dirname, 'public')));
app.use('/thuoc/sua', express.static(path.join(__dirname, 'public')));
app.use('/phieukhambenh', express.static(path.join(__dirname, 'public')));
app.use('/phieukhambenh/chitiet', express.static(path.join(__dirname, 'public')));
app.use('/phieukhambenh/them', express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, 'public')));


var shortDateFormat = "ddd @ h:mmA"; // this is just an example of storing a date format once so you can change it in one place and have it propagate
app.locals.moment = moment; // this makes moment available as a variable in every EJS page
app.locals.shortDateFormat = shortDateFormat;

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
