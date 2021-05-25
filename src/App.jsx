import React, { useState } from 'react';

const App = () => {

  const [ state, setState ] = useState('hola');

  return (
    <div>
      <h1>{ state }</h1>
    </div>
  );
};

export default App;
