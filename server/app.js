const dotenv = require('dotenv');
dotenv.config({path:__dirname+'/./../.env'});
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const testAPIRouter = require('./routes/testAPI');
const gifRouter = require('./routes/gif');

const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/testAPI', testAPIRouter);
app.use('/api/gif', gifRouter);

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

// socket 
io.on('connection', socket => {

  console.log('a client has connected');

  socket.on('DISCONNECT', function(data) {
    console.log(`${data.userID} has disconnected`);
  });

  socket.on('ADD_MESSAGE', function(data) {
    console.log('message received by server');
    io.emit('RECEIVE_MESSAGE', data) });

  socket.on('ADD_USER', function(userID) {
    console.log('Adding user');
    io.emit('RECEIVE_USER', userID)
  });

  socket.on('LOGOUT_USER', function(userID) {
    console.log('Removing user');
    io.emit('REMOVE_USER', userID)
  });

});

module.exports = {app: app, server: server}
