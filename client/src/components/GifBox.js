import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '25px',
    marginBottom: '25px'
  },
}));

export default function GifBox({gif}) {

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <iframe src={gif} width="50%" height="250px" frameborder="0"></iframe>
    </Box>
  );
}
