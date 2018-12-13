import {
  ADD_ONBOARDING_PROPERTIES,
  CHANGE_STAGE,
  REMOVE_PICTURE_TO_CROP,
  REMOVE_USER,
  STORE_PICTURE_CROPPED,
  STORE_PICTURE_TO_CROP,
  TOGGLE_PICTURE_PICKER,
  TOGGLE_REGISTERING_MENTOR,
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

export const addOnboardingProperties = (properties) => {
  return {
    type: ADD_ONBOARDING_PROPERTIES,
    properties
  }
};

export const toggleRegisteringMentor = () => {
  return {
    type: TOGGLE_REGISTERING_MENTOR,
  }
};

export const registerMentor = () => {
  return (dispatch,getState) => {
    dispatch(toggleRegisteringMentor());
    const {onboarding} = getState();
    return api.post("/api/mentors/registerNew", onboarding).then(r => {
      dispatch(toggleRegisteringMentor());
      if(r.success) {
        window.localStorage.setItem("user", JSON.stringify(r.payload));
        dispatch(updateUser(r.payload));
      }
    })
  }
};

export const saveMentorSettings = (values) => {
  return (dispatch, getState) => {
    const formData = new FormData();
    const {pictureCropped} = getState().settings;
    if (pictureCropped) formData.append("file", pictureCropped);
    formData.append("data", JSON.stringify(values));
    return api.postForm("/api/users/edit", formData).then(r => {
      if(r.success){
        window.localStorage.setItem("user", JSON.stringify(r.payload));
        dispatch(updateUser(r.payload));
      }
      return r;
    });
  }
};


