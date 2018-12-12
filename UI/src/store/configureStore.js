import app from '../reducers/rootReducer'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
const store = createStore(app, applyMiddleware(createLogger(), thunkMiddleware));
export default store;