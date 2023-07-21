
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session');

var indexRouter = require('./routes/index');
var app_sample_newUser = require('./routes/newUser');
var app_sample_client = require('./routes/client');
var app_sample_sender = require('./routes/sender');
var customEmpRouter = require('./routes/customEmp');
var assigntaskRouter = require('./routes/assigntask');
var apptaskRouter = require('./routes/apptask');
var alltaskRouter = require('./routes/alltask');
var dataexRouter = require('./routes/dataex');
var headerrtaskRouter = require('./routes/headerr');
var loginRouter = require('./routes/login');
var customEmpRouter = require('./routes/customEmp');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret : 'webslesson',
  resave : true,
  saveUninitialized : true
}));
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

//app.use("/styles",express.static(__dirname + "/styles"));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/newUser', app_sample_newUser);
app.use('/client', app_sample_client);
app.use('/sender', app_sample_sender);
app.use('/assigntask', assigntaskRouter);
app.use('/apptask', apptaskRouter);
app.use('/alltask', alltaskRouter);
app.use('/dataex', dataexRouter);
app.use('/headerr', headerrtaskRouter);
app.use('/login', loginRouter);
app.use('/customEmp', customEmpRouter);
app.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
   // res.send("logged out");
    res.redirect("/login");
 })
 
});
//serving public file
app.use(express.static(__dirname));

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


app.use(function (req, res, next) {
  if (req.session && req.session.user_name)
   res.locals.user_name = true;
  next();
 });


app.use(function (req, res, next) {
  res.locals.user_name = req.session.user_name;
 // console.log(user_name);
  next();
});
//app.use(session);



module.exports = app;



// const port=3000
// app.listen(port, () => {
//   console.log(`Example app listening on port : :  ${port}`)
// })