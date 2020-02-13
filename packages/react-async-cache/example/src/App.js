import React from 'react';

import './App.css';
import { Counter } from './Counter';
import { SetCounter } from './SetCounter';
import { SetCounterGlobal } from './SetCounterGlobal';
import { ErrorExample } from './ErrorExample';
import { CounterEffect } from './CounterEffect';
import { Counter2 } from './Counter2';
import { SetCounter2 } from './SetCounter2';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          react-async-cache
        </p>
      </header>
      <Counter />
      <Counter />
      <CounterEffect />
      <SetCounter />
      <SetCounterGlobal />
      <Counter2 />
      <SetCounter2 />
      <ErrorExample />
    </div>
  );
}

export default App;
