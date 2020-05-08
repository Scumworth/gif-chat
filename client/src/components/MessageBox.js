import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import MessageIcon from '@material-ui/icons/Message';

const useStyles = makeStyles((theme) => ({
  messageList: {
    marginLeft: '0 auto',
    width: '80%',
    maxHeight: '400px',
    overflow: 'auto',
    padding: '5px'
  },
  root: {
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
    <Box className={classes.root}>
      <List className={classes.messageList}>
        { 
          messages.length > 0 ?
          messages.map(data => {
            return (
              <Box className={classes.messageWrapper}>
                <ListItem>
                  <ListItemIcon><MessageIcon /></ListItemIcon>
                  <ListItemText 
                    primary={ `${data.userID}` } 
                    primaryTypographyProps={{ style: {fontSize: '14px', fontWeight: 'bold'} }}
                    secondary={ `${data.message}` }
                    secondaryTypographyProps={{ style: {fontSize: '18px', color: '#000000'} }}
                  />
                </ListItem>
              </Box>
            );
          })
          : <Box className = {classes.messageWrapper}>
              <ListItem>
                <ListItemIcon><MessageIcon /></ListItemIcon>
                <ListItemText
                  primary="ChatBot"
                  primaryTypographyProps={{ style: {fontSize: '14px', fontWeight: 'bold'} }}
                  secondary="No one has sent any messages yet. Login and type a message below to start."
                  secondaryTypographyProps={{ style: {fontSize: '18px', color: '#000000'} }}
                />
              </ListItem>
            </Box>
        }
        <div ref={endChatWindowRef} />
      </List>
    </Box>
  )
}
