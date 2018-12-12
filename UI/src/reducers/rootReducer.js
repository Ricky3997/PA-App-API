import {REMOVE_USER, UPDATE_USER} from "../actions/actionTypes";
import { combineReducers } from 'redux';

function user(state = null, action) {
  switch (action.type) {
    case (UPDATE_USER):
      return action.user;
    case (REMOVE_USER):
      return null;
    default:
      return state
  }
}

const app = combineReducers({
  user,
});

export default app