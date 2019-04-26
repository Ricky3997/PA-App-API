import app from '../reducers/rootReducer';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';

export default createStore(app, applyMiddleware(thunkMiddleware, createLogger()));