import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, IconButton } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50px',
    backgroundColor: '#90a4ae',
    color: '#ffffff'

  }
}));

export default function Footer() {

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <IconButton 
        target="_blank" 
        href="https://github.com/Scumworth" 
        aria-label="open github link"
      >
        <GitHubIcon />
      </IconButton>
    </Box>
  );
}
