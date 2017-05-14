import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import IntroPage from './Intro';

import { store } from './store/reducers';

// require avoids TS "Could not find a declaration file" errors.
// Update once DefinitelyTyped includes react-redux 5.0.4
const reactRedux = require('react-redux');

let page = null;
if (window.location.pathname === '/values') {
  page = (
    <reactRedux.Provider store={store}>
      <App />
    </reactRedux.Provider>
  );
} else if (window.location.pathname === '/') {
  page = <IntroPage />
} else {
  // ehh, we don't really need a 404 for now
  page = <IntroPage />;
}

ReactDOM.render(
  page,
  document.getElementById('root')
);
