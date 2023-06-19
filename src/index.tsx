import React from 'react';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import store from './services/store'
import { HashRouter} from 'react-router-dom';


const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);