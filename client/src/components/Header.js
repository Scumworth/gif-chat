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

export default function Header({userID, socket}) {
  
  const [loginStatus, setLoginStatus ] = useState(false);
  const classes = useStyles();
  if(userID.length > 0) {
      setLoginStatus(true);
  }
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Gif Chat
          </Typography>
          {
            true ?
              <div>
              <InputBase
                placeholder="Username"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'login' }}
              />
              <Button color="inherit">Login</Button>
              </div>
              : null
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}
