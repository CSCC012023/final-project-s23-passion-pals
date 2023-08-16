import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import thunk from 'redux-thunk';

import  reducers  from './reducers';
import App from './App';


const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
    
  <Provider store={store}>
    
    <BrowserRouter>
        <App />
    </BrowserRouter>

  </Provider>,
  document.getElementById('root'),
);