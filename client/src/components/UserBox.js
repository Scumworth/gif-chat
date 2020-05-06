import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

export default function UserBox({online}) {
  return (
    <div>
      <List>
        {
          online.map(user => {
            return (
              <ListItem>
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText primary={user}/>
              </ListItem>
            );
          })
        }
      </List>
    </div>
  );
}
