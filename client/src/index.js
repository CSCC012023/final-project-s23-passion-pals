import React from 'react';
import  ReactDOM  from 'react-dom';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));