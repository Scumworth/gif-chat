import React, { useState, useEffect, useReducer } from 'react';
import { useImmer } from 'use-immer';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import './App.css';

import GifBox from './GifBox';
import MessageBox from './MessageBox';
import UserBox from './UserBox'
import TalkBox from './TalkBox'
import Header from './Header'
import Footer from './Footer';

const axios = require('axios');
const io = require('socket.io-client');

let socketURL;
if(process.env.NODE_ENV === 'development') {
  socketURL = 'http://localhost:9000';
}
else if(process.env.NODE_ENV === 'production') {
  socketURL = 'https://gif-chat-app.herokuapp.com/';
}
const socket = io.connect(socketURL, { 'sync disconnect on unload': true });

const useStyles = makeStyles((theme) => ({
  appWrapper: {
    minWidth: '320px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  contentWrapper: {
    flex: '1 0 auto',
  },
  footerWrapper: {
    flexShrink: 0,
  },
}));

export default function App() {
  const [ userState, setUserState] = useReducer(
    (userState, newUserState) => ({...userState, ...newUserState}),
    {userID: '', loginInput: '', loginStatus: false}
  );
  const [ online, setOnline ] = useImmer([]);
  const [ messages, setMessages ] = useImmer([]);
  const [ gif, setGif ] = useState('')
  const classes = useStyles();
  
  useEffect(() => {

    // connect socket when component mounts
    socket.connect(); 

    socket.on('INITIALIZE_USERS', userArray => {
      console.log('Initial users retrieved.', userArray);
      setOnline(draft => {
        return userArray;
      });
    });

    socket.on('INITIALIZE_MESSAGES', messageArray => {
      console.log('Initial messages retrieved.', messageArray);
      setMessages(draft => {
        return messageArray;
      });
    });

    socket.on('INITIALIZE_GIF', gifURL => {
      console.log('Initial GIF received from server.');
      setGif(gifURL);
    });

    socket.on('RECEIVE_USER', userID => {
      setOnline(draft => {
        draft.push(userID);
      });
    });

    socket.on('REMOVE_USER', userID => {
      setOnline(draft => {
        return draft.filter(user => user !== userID);
      });
    });

    socket.on('RECEIVE_MESSAGE', data => {
      setMessages(draft => {
        draft.push({userID: data.userID , message: data.message});
      });
    });

    socket.on('RECEIVE_GIF', gifURL => {
      console.log('New gif received from server');
      setGif(gifURL);
    });

    // diconnect socket when component unmounts
    return () => {
      socket.emit('disconnect');
    }
  }, []); // empty array as second argument in useEffect to only define on first render

  return (
    <div className = { classes.appWrapper }>
      <div className={ classes.contentWrapper }>
        <Header 
          userID={userState.userID} 
          loginStatus = {userState.loginStatus} 
          loginInput = {userState.loginInput}
          setUserState={setUserState}  
          socket={socket} 
        />
        <Grid container>
          <Grid item xs={12} md={2}>
            <UserBox online = {online} />
          </Grid>
          <Grid item xs={12} md={10}>
            <MessageBox messages={messages} />
          </Grid>
        </Grid>
        <TalkBox 
          userID = {userState.userID} 
          loginStatus = {userState.loginStatus}
          socket={socket}
        />
        <GifBox gif={gif}/>
      </div>
      <Footer />
    </div>
  );

}

