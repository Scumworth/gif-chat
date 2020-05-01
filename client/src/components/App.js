import React, { useState, useEffect } from 'react';
import useSocket from 'use-socket.io-client';
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

const [id, setId] = useState('');
const [socket] = useSocket('localhost:9000');
const [ online, setOnline ] = useImmer([]);
const [ messages, setMessages ] = useImmer([]);

useEffect(() => {

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
  

}, []); // empty array or 0 as second argument in useEffect to only define on first render

export default function App() {

  return (
    <div>
      <Header />
      <LoginBox id = {id} socket={socket}/>
      <Grid container>
        <Grid item xs>
          <UserBox/>
        </Grid>
        <Grid item xs>
          <MessageBox />
        </Grid>
      </Grid>
      <TalkBox socket={socket}/>
      <GifBox />
      <Footer />
    </div>
  );

}
