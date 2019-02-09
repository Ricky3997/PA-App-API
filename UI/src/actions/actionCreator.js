import {
  ADD_ONBOARDING_PROPERTIES,
  CHANGE_STAGE,
  REMOVE_PICTURE_TO_CROP,
  REMOVE_USER, SET_ACTIVE_MENTOR_APPROVAL_ID, SET_MENTEES, SET_MENTORS,
  STORE_PICTURE_CROPPED,
  STORE_PICTURE_TO_CROP, TOGGLE_ADMIN_FETCHING,
  TOGGLE_PICTURE_PICKER,
  TOGGLE_REGISTERING,
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

export const togglePicturePicker = () => {
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

export const toggleRegistering = () => {
  return {
    type: TOGGLE_REGISTERING,
  }
};

export const changeMentorStatus = (status) => {
  return (dispatch, getState) => {
    return api.post("/api/mentors/changeStatus", {status: status}).then(r => {
      if(r.success) {
        window.localStorage.setItem("user", JSON.stringify(r.payload));
        dispatch(updateUser(r.payload));
      }
      return r;
    })
  }
};

export const changeMenteeStatus = (status) => {
  return (dispatch, getState) => {
    return api.post("/api/mentees/changeStatus", {status: status}).then(r => {
      if(r.success) {
        window.localStorage.setItem("user", JSON.stringify(r.payload));
        dispatch(updateUser(r.payload));
      }
      return r;
    })
  }
};


export const registerMentor = () => {
  return (dispatch,getState) => {
    dispatch(toggleRegistering());
    const {onboarding} = getState();
    return api.post("/api/mentors/registerNew", onboarding).then(r => {
      dispatch(toggleRegistering());
      if(r.success) {
        window.localStorage.setItem("user", JSON.stringify(r.payload));
        dispatch(updateUser(r.payload));
      }
      return r;
    })
  }
};

export const registerMentee = () => {
  return (dispatch,getState) => {
    dispatch(toggleRegistering());
    const {onboarding} = getState();
    return api.post("/api/mentees/registerNew", onboarding).then(r => {
      dispatch(toggleRegistering());
      if(r.success) {
        window.localStorage.setItem("user", JSON.stringify(r.payload));
        dispatch(updateUser(r.payload));
      }
      return r;
    })
  }
};

export const saveSettings = (values) => {
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


export const setMentors = (mentors) => {
  return {
    type: SET_MENTORS,
    mentors: mentors
  }
};

export const setMentees = (mentees) => {
  return {
    type: SET_MENTEES,
    mentees: mentees
  }
};

export const setActiveMentorApprovalId = (id) => {
  return {
    type: SET_ACTIVE_MENTOR_APPROVAL_ID,
    id: id
  }
};

export const toggleAdminFetching = () => {
  return {
    type: TOGGLE_ADMIN_FETCHING
  }
};


export const fetchMentors = () => {
  return (dispatch) => {
    dispatch(toggleAdminFetching());
    return api.get("/api/mentors").then(r => {
      dispatch(toggleAdminFetching());
      if(r.success){
        dispatch(setMentors(r.payload));
        if(r.payload.filter(m => m.status === "requested").length > 0) dispatch(setActiveMentorApprovalId(r.payload.filter(m => m.status === "requested")[0]._id));
      }
    })
  }
};
export const fetchMentees = () => {
  return (dispatch) => {
    dispatch(toggleAdminFetching());
    return api.get("/api/mentees").then(r => {
      dispatch(toggleAdminFetching());
      if(r.success){
        dispatch(setMentees(r.payload));
        // if(r.payload.filter(m => m.status === "requested").length > 0) dispatch(setActiveMentorApprovalId(r.payload.filter(m => m.status === "requested")[0]._id));
      }
    })
  }
};

export const adminChangeMentorStatus = (id, status) => {
  return (dispatch, getState) => {
    dispatch(toggleAdminFetching());
    return api.post("/api/admin/changeMentorStatus", {id: id, status: status}).then(r => {
      dispatch(toggleAdminFetching());
      let {mentors} = getState().admin;
      mentors = mentors.filter(m => m._id !==id);
      mentors.push(r.payload);
      if(r.success){
        dispatch(setMentors(mentors));
        mentors = getState().admin.mentors;
        if(mentors.filter(m => m.status === "requested").length > 0) dispatch(setActiveMentorApprovalId(mentors.filter(m => m.status === "requested")[0]._id));
      }

    })
  }
};


