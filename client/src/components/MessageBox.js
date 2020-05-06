import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import MessageIcon from '@material-ui/icons/Message';

export default function MessageBox({messages}) {
  return (
    <div>
      <List>
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
      </List>
    </div>
  )
}
