import './wdyr';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/app.css';

// Context de Firebase
import FirebaseContext from './context/firebase';
import { firebase, FieldValue } from './lib/firebase';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider
      value={{
        firebase,
        FieldValue
      }}
    >
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

/*
This app is:
  Cliente-side rendered app: react (cra)
  Database: Firebase
  Dependencies: {
    react-loading-skeleton,
    datefns
  }
  Style: tailwind
  Architecture: {
    src
      components
      constants
      context
      helpers
      hooks
      pages
      lib         : Firebase is going to live here.
      services    : Firebase functions in here.
      styles      : Tailwind's folder.
  }
*/
