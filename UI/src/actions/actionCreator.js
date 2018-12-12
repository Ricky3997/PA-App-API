import {REMOVE_USER, UPDATE_USER} from "./actionTypes";
import * as api from "../api";

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

export const getUser = () => {
  return (dispatch) => {
    return api.get("/api/users/profile").then(r => {
      if(r.success) {
        window.localStorage.setItem("user", JSON.stringify(r.payload));
        dispatch(updateUser(r.payload));
      }
      else {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
      }
    })
  }
};
