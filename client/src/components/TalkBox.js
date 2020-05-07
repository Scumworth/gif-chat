import React from 'react';
import { Box, TextField, Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    '& .inputField': {
      width: '100%'
    }
  },
  talkWrapper: {
    margin: '0 auto',
    width: '80%',
    maxWidth: '800px',
    alignItems: 'center'
  },
  largeIcon: {
    width: 60,
    height: 60,
  }
}));

export default function TalkBox({socket, userID, loginStatus}) {

  const classes = useStyles();
  const[message, setMessage] = React.useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  
  const handleEnterKey = (event) => {
    if(event.key == 'Enter') {
      event.preventDefault();
    }
    if(loginStatus && event.key == 'Enter' && message.length > 0) {
      socket.emit('ADD_MESSAGE', {message, userID});
      setMessage("");
    }
  }

  const handleClick = (event) => {
    if(loginStatus && message.length > 0) {
      socket.emit('ADD_MESSAGE', {message, userID});
      setMessage("");
    }
  }

  return (
    <div id="testname" className={classes.root}>
      <form noValidate autoComplete="off">
        <Grid className={classes.talkWrapper} container> 
          <Grid item xs={11}>
            {
              loginStatus ? 
                <TextField
                  className="inputField"
                  multiline
                  rows={5}
                  variant="outlined"
                  onChange={handleChange}
                  onKeyPress={handleEnterKey}
                  value={message}
                  label="Enter message here..."
                />
              : <TextField 
                  disabled
                  multiline 
                  className="inputField" 
                  variant="outlined" 
                  label="Login to start chatting."
                  rows={5} 
                />
            }
          </Grid>
          <Grid item xs={1}>
            {
              loginStatus ?
                <IconButton onClick={handleClick} aria-label="post message">
                  <SendIcon className={classes.largeIcon} />
                </IconButton>
              : <IconButton disabled onClick={handleClick} aria-label="post message">
                <SendIcon className={classes.largeIcon} />
                </IconButton>
            }
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
