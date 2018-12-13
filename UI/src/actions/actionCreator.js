import {
  CHANGE_ONBOARDING_TYPE, CHANGE_STAGE,
  REMOVE_PICTURE_TO_CROP,
  REMOVE_USER, STORE_PICTURE_CROPPED,
  STORE_PICTURE_TO_CROP,
  TOGGLE_PICTURE_PICKER,
  UPDATE_USER
} from "./actionTypes";
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

export const togglePicurePicker = () => {
  return {
    type: TOGGLE_PICTURE_PICKER
  }
};

export const storePictureToCrop = (pictureToCrop) => {
  return {
    type: STORE_PICTURE_TO_CROP,
    pictureToCrop
  }
};

export const removePictureToCrop = () => {
  return {
    type: REMOVE_PICTURE_TO_CROP
  }
};

export const storePictureCropped = (pictureCropped) => {
  return {
    type: STORE_PICTURE_CROPPED,
    pictureCropped
  }
};

export const changeStage = (change) => {
  return {
    type: CHANGE_STAGE,
    change
  }
};

