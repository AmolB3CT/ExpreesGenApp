var createError = require('http-errors');
var express = require('express');
var path = require('path');
const {MongoClient, ObjectId} = require('mongodb');
const client = new MongoClient("mongodb://localhost:27017");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dataRouter = require('./routes/data_db');
const PORT = 3000;
const {join} = require("path");
var app = express();
const http = require('http')
const server = http.createServer(app);
let db;
mongoose.connect("mongodb://localhost:27017/PatientPortalDB");

const connectMongo = async () => {
  try {
    const mongoClient = await client.connect();
    db = mongoClient.db("PatientPortalDB");
  } catch (error) {
    console.error(`Error connecting to mongodb server ${error.message}`);
  }
};
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  req.db = db;
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/data', dataRouter);

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

server.listen(PORT, async () => {
  await connectMongo();
  console.log(`Express application started listening at http://localhost:${PORT}`);
})
module.exports = app;
