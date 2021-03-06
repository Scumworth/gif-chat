if(process.env.NODE_ENV === 'development') {
  const dotenv = require('dotenv');
  dotenv.config({path:__dirname+'/./../.env'});
}
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const testAPIRouter = require('./routes/testAPI');

const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server);
const giphy = require('giphy-api')(process.env.GIPHY_API_KEY);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/testAPI', testAPIRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

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

let allMessages = [];
let allUsers = [];
let currentGif = "https://giphy.com/embed/kzxOVNpKLWDyL9tTTn";

// socket 
io.on('connection', socket => {

  let currentUser;

  console.log('a client has connected');
  
  socket.emit('INITIALIZE_USERS', allUsers);

  socket.emit('INITIALIZE_MESSAGES', allMessages)

  socket.emit('INITIALIZE_GIF', currentGif);

  socket.on('disconnect', function() {
    allUsers = allUsers.filter(user => user !== currentUser);
    console.log(`${currentUser} has disconnected`);
    io.emit('REMOVE_USER', currentUser)
  });

  socket.on('ADD_MESSAGE', function(data) {
    console.log('message received by server');
    allMessages.push(data);
    io.emit('RECEIVE_MESSAGE', data) 
    giphy.search(data.message).then(function(giphyResponse) {
      currentGif = giphyResponse.data[Math.floor(Math.random() * giphyResponse.data.length)].embed_url;
      io.emit('RECEIVE_GIF', currentGif);
    }).catch(e => console.log(e));
  });

  socket.on('ADD_USER', function(userID) {
    console.log('Adding user');
    currentUser = userID;
    allUsers.push(userID);
    io.emit('RECEIVE_USER', userID)
  });

  socket.on('LOGOUT_USER', function(userID) {
    console.log('Removing user');
    allUsers = allUsers.filter(user => user !== userID);
    io.emit('REMOVE_USER', userID)
  });

});



module.exports = {app: app, server: server}
