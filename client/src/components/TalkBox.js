import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '90%',
    },
  },
}));

export default function TalkBox({socket, userID}) {

  const classes = useStyles();
  const[message, setMessage] = React.useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  
  const handleSubmit = (event) => {
    if(event.key == 'Enter') {
      console.log('enter pressed');
      socket.emit('ADD_MESSAGE', {message, userID});
    }
  }

  return (
    <div id="testname" className={classes.root}>
      <form noValidate autoComplete="off">
          <TextField
            multiline
            rows={5}
            variant="outlined"
            onChange={handleChange}
            onKeyPress={handleSubmit}
            label="Enter message here..."

          />
      </form>
    </div>
  );
}
