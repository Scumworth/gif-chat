import React from 'react';

export default function UserBox({online}) {
  return (
    <div>
      {online.map(user => <p>{user}</p>)}
    </div>
  );
}
