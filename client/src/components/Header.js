import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputBase, AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  inputRoot: {
    color: 'inherit',
    width: '70%'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    }
  },
}));

export default function Header({userID, loginInput, setUserState, socket, loginStatus}) {
  
  const classes = useStyles();

  const handleChange = (event) => {
    setUserState({loginInput: event.target.value});
  }
  const handleEnterKey = (event) => {
    if(event.key == 'Enter' && loginInput.length > 0) {
      socket.emit('ADD_USER', loginInput);
      setUserState({userID: loginInput, loginStatus: true});
    }
  }
  const handleLogin = (event) => {
    if(loginInput.length > 0){
      socket.emit('ADD_USER', loginInput);
      setUserState({userID: loginInput, loginStatus: true}); 
    }
  };

  const handleLogout = (event) => {
    socket.emit('LOGOUT_USER', loginInput);
    setUserState({userID: '', loginInput: '', loginStatus: false});
  };
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Gif Chat
          </Typography>
          {
            !loginStatus ?
              <div>
              <InputBase
                placeholder="Username"
                onChange={handleChange}
                onKeyPress={handleEnterKey}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'login' }}
              />
              <Button onClick = {handleLogin} color="inherit">Login</Button>
              </div>
              : 
              <div>
                <Typography> Hello { userID }</Typography>
                <Button onClick={handleLogout} color="inherit">Logout</Button>
              </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}
