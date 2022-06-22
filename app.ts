var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userRouter = require('./routes/user.ts');
var addressRouter=require('./routes/address.ts');
var planRouter = require('./routes/plans.ts');
var partnerRouter=require('./routes/partner.ts')
var retailerRouter=require('./routes/retailer.ts')
var distributorRouter=require('./routes/distributor.ts')
// database connection
var dbConn  = require('./src/database/index.ts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user',userRouter);
app.use('/address',addressRouter);
app.use('/plans',planRouter);
app.use('/partner',partnerRouter);
app.use('/retailer',retailerRouter);
app.use('/distributor',distributorRouter);


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
