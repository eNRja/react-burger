import React from 'react';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { createRoot  } from 'react-dom/client';
import { rootReducer } from './services/reducers';
import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);