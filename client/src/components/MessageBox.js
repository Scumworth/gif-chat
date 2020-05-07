import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import MessageIcon from '@material-ui/icons/Message';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: '0 auto',
    width: '75%',
    minHeight: '10px',
    maxHeight: '400px',
    overflow: 'auto',
    borderRadius: '5px',
  },
  listWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    marginTop: '10px'
  },
  messageWrapper: {
    backgroundColor: '#fafafa',
    borderRadius: '5px',
    marginBottom: '5px'
  }
}));

export default function MessageBox({messages}) {

  const endChatWindowRef = useRef(null);
  const scrollToBottom = () => {
    endChatWindowRef.current.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(scrollToBottom);
  const classes = useStyles();

  return (
    <Box className={classes.listWrapper}>
      <List className={classes.root}>
        { 
          messages.map(data => {
            return (
              <Box className={classes.messageWrapper}>
              <ListItem>
                <ListItemIcon><MessageIcon /></ListItemIcon>
                <ListItemText primary={ data.userID + ":   " + data.message }/>
              </ListItem>
              </Box>
            );
          })
        }
        <div ref={endChatWindowRef} />
      </List>
    </Box>
  )
}
