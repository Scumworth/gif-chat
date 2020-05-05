import React from 'react';
import { TextField, Grid, IconButton } from '@material-ui/core';
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
}));

export default function TalkBox({socket, userID}) {

  const classes = useStyles();
  const[message, setMessage] = React.useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  
  const handleEnterKey = (event) => {
    if(event.key == 'Enter' && message.length > 0) {
      console.log('enter pressed');
      socket.emit('ADD_MESSAGE', {message, userID});
      setMessage("");
    }
  }

  const handleClick = (event) => {
    if(message.length > 0) {
      socket.emit('ADD_MESSAGE', {message, userID});
      setMessage("");
    }
  }

  return (
    <div id="testname" className={classes.root}>
      <form noValidate autoComplete="off">
        <Grid container> 
          <Grid item xs={10}>
            <TextField
              className="inputField"
              multiline
              rows={5}
              variant="outlined"
              onChange={handleChange}
              onKeyPress={handleEnterKey}
              label="Enter message here..."
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={handleClick} aria-label="post message">
              <SendIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
