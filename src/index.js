// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider
import App from './App';
import store from './components/store'; // Import your store

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root element
root.render(
  <Provider store={store}>  {/* Wrap your app with Provider */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
