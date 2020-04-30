import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useSocket from 'use-socket.io-client';
import logo from './logo.svg';
import './App.css';

export default function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro"> { this.state.apiResponse } </p>
    </div>
  );

}
