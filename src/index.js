import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { BrowserRouter } from 'react-router-dom';
import { ActionTypes } from './actions';
// import { validateToken } from './actions';
import rootReducer from './reducers';

import App from './components/app';

// this creates the store with the reducers
const store = configureStore({
  reducer: rootReducer,
});

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: ActionTypes.AUTH_USER, payload: { email: '', authorName: '' } });
  // validateToken();
}

const root = createRoot(document.getElementById('main'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
