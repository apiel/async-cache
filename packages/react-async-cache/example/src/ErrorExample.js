import React from 'react';
import { useAsyncCacheWatch } from 'react-async-cache';
import { api } from './mockapi';

const errorStyle = {
  color: 'red',
}

export const ErrorExample = () => {
  const { call, response, error } = useAsyncCacheWatch(api, '/no-route');
  React.useEffect(() => {
    call();
  });
  return (
    <div style={errorStyle}>
      {!response && !error && <p>loading...</p>}
      {error && <p><b>Some error handling example:</b> {error} </p>}
    </div>
  );
}
