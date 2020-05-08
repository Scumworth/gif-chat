import React from 'react';

export default function GifBox({gif}) {

  return (
    <div>
      <iframe src={gif} width="100%" height="200px" frameborder="0"></iframe>
    </div>
  );
}
