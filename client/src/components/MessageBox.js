import React from 'react';
import { Card, Paper, Typography } from '@material-ui/core';

export default function MessageBox({messages}) {
  return (
    <div>
      <Typography>Message Box</Typography>
      { messages.map(data => {
        return (<Card><Typography>{ data.userID }:{ data.message }</Typography></Card>);
        })
      }
    </div>
  )
}
