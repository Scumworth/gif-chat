import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import MessageIcon from '@material-ui/icons/Message';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '75%',
    maxHeight: '200px',
    overflow: 'auto',
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
    <List className={classes.root}>
      { 
        messages.map(data => {
          return (
            <ListItem>
              <ListItemIcon><MessageIcon /></ListItemIcon>
              <ListItemText primary={ data.userID + ":   " + data.message }/>
            </ListItem>
          );
        })
      }
      <div ref={endChatWindowRef} />
    </List>
  )
}
