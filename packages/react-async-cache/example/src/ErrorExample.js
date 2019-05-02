import React from 'react';
import { useAsyncCache } from 'react-async-cache';
import { api } from './mockapi';

const errorStyle = {
  color: 'red',
}

export const ErrorExample = () => {
  const { call, response, error } = useAsyncCache();
  React.useEffect(() => {
      call(api, '/no-route');
  });
  return (
    <div style={errorStyle}>
      {!response && !error && <p>loading...</p>}
      {error && <p><b>Some error handling example:</b> {error.toString()} </p>}
    </div>
  );
}
