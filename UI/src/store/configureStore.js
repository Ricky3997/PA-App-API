import { createStore } from 'redux'
import app from '../reducers/rootReducer'
const store = createStore(app);
export default store;