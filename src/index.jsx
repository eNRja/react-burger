import React from 'react';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { store } from './services/store'
import { BrowserRouter as Router} from 'react-router-dom';


const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);