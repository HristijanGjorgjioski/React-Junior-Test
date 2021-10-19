import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { GraphqlClientContext, opusClient } from './graphql/context';
import reducers from './reducers';

import './index.scss'
import App from './App';

const store = createStore(reducers, composeWithDevTools())

ReactDOM.render(
  <GraphqlClientContext.Provider value={opusClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </GraphqlClientContext.Provider>,
  document.getElementById('root')
);
