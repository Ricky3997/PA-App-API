import {REMOVE_USER, UPDATE_USER} from "./actionTypes";

export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user
  }
};


export const removeUser = () => {
  return {
    type: REMOVE_USER
  }
};