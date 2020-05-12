import React from 'react';
import { Box, List, ListItem, ListItemText, ListItemIcon, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '5px',
    marginTop: '10px',
  },
}));

export default function UserBox({online}) {

  const classes = useStyles();
  console.log('online', online);
  return (
    <Box className= {classes.root}>
      <Typography variant="overline">{online.length} user(s) online.</Typography>
        <List>
          {
            online.map(user => {
              return (
                <ListItem>
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText 
                    primary={user}
                    primaryTypographyProps={{ style: {fontSize: '14px', fontStyle: 'italic'} }}
                  />
                </ListItem>
              );
            })
          }
        </List>
    </Box>
  );
}
