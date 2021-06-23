import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { PersistGate } from 'redux-persist/es/integration/react';
import store, { persistor } from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);