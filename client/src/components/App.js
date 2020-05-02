import React, { useState, useEffect } from 'react';
import { useImmer } from 'use-immer';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import './App.css';

import GifBox from './GifBox';
import LoginBox from './LoginBox';
import MessageBox from './MessageBox';
import UserBox from './UserBox'
import TalkBox from './TalkBox'
import Header from './Header'
import Footer from './Footer';

const io = require('socket.io-client');
const socket = io('http://localhost:9000');

export default function App() {
  
  const [userID, setUserID] = useState('');
  const [ online, setOnline ] = useImmer([]);
  const [ messages, setMessages ] = useImmer([]);

  useEffect(() => {

    // connect socket when component mounts
    socket.connect(); 

    socket.on('RECEIVE_USER', userID => {
      setOnline(draft => {
        draft.push(userID);
      });
    });

    socket.on('REMOVE_USER', userID => {
      setOnline(draft => {
        draft.filter(user => user !== userID);
      });
    });

    socket.on('RECEIVE_MESSAGE', data => {
      setMessages(draft => {
        draft.push({userID: data.userID , message: data.message});
      });
    });

    // diconnect socket when component unmounts
    return () => {
      socket.emit('DISCONNECT', {
        userID: userID
      });
    }
  }, []); // empty array as second argument in useEffect to only define on first render

  return (
    <div>
      <Header />
      <LoginBox userID = {userID} socket={socket}/>
      <Grid container>
        <Grid item xs>
          <UserBox/>
        </Grid>
        <Grid item xs>
          <MessageBox messages={messages} />
        </Grid>
      </Grid>
      <TalkBox userID = {userID} socket={socket}/>
      <GifBox />
      <Footer />
    </div>
  );

}
