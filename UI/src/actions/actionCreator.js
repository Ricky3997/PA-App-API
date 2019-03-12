import {
  ADD_MESSAGES_TO_CHAT,
  ADD_MESSAGING_CHAT,
  ADD_ONBOARDING_PROPERTIES,
  CHANGE_STAGE,
  REMOVE_PICTURE_TO_CROP,
  REMOVE_USER,
  SENT_LOGIN_EMAIL,
  SET_ACTIVE_CHAT,
  SET_ACTIVE_JOURNEY_MODULE,
  SET_ACTIVE_MENTEE_APPROVAL_ID,
  SET_ACTIVE_MENTOR_APPROVAL_ID,
  SET_MATCHING_ID,
  SET_MENTEE_APPROVAL_PROPERTIES,
  SET_MENTEES,
  SET_MENTOR_APPROVAL_PROPERTIES,
  SET_MENTOR_HOME_PROGRESS,
  SET_MENTOR_RECOMMENDATIONS,
  SET_MENTORS,
  SET_RELATIONSHIPS,
  SHOW_MATCHING_CONFIRMATION,
  STORE_PICTURE_CROPPED,
  STORE_PICTURE_TO_CROP,
  SWITCH_MATCHING_MODE,
  TOGGLE_ADMIN_FETCHING,
  TOGGLE_ADMIN_MODAL,
  TOGGLE_MENTEE_HOME_MODAL,
  TOGGLE_MENTOR_HOME_MODAL,
  TOGGLE_MESSAGING_CONNECTED,
  TOGGLE_PICTURE_PICKER,
  TOGGLE_REGISTERING, TOGGLE_SHOW_MATCHING_DETAILS_MODAL,
  UNSET_LOGIN_EMAIL,
  UNSET_MATCHING_CONFIRMATION,
  UPDATE_USER
} from "./actionTypes";
import * as api from "../api";
import { toast } from "react-toastify";

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
export const toggleMentorHomeModal = () => {
  return {
    type: TOGGLE_MENTOR_HOME_MODAL
  }
};

export const toggleMatchingDetailsModal = () => {
  return {
    type: TOGGLE_SHOW_MATCHING_DETAILS_MODAL
  }
};

export const toggleMenteeHomeModal = () => {
  return {
    type: TOGGLE_MENTEE_HOME_MODAL
  }
};

export const confirmEmailAddress = (token, id) => {
  return (dispatch) => {
    return api.get(`/auth/confirm?token=${token}&id=${id}`).then(r => {
      if(r.success) updateAndStoreUser(dispatch, r.payload);
      return r;
    })
  }
};

export const sendEmailConfirmationAgain = (id) => {
  return () => {
    return api.get(`/auth/sendConfirmation?id=${id}`);
  }
};

export const getUser = () => {
  return (dispatch) => {
    return api.get("/api/users/profile").then(r => {
      if(r.success) updateAndStoreUser(dispatch, r.payload);
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
export const toggleAdminModal = () => {
  return {
    type: TOGGLE_ADMIN_MODAL
  }
};

export const setMentorApprovalProperties = (properties) => {
  return {
    type: SET_MENTOR_APPROVAL_PROPERTIES,
    properties: properties
  }
};
export const setMenteeApprovalProperties = (properties) => {
  return {
    type: SET_MENTEE_APPROVAL_PROPERTIES,
    properties: properties
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


export const changeActiveJourneyModule = (id) => {
  return {
    type: SET_ACTIVE_JOURNEY_MODULE,
    id: id
  }
};

export const setMentorHomeProgress = (progress) => {
  return {
    type: SET_MENTOR_HOME_PROGRESS,
    progress: progress
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

export const changeMentorStatus = (status, properties) => {
  return (dispatch, getState) => {
    return api.post("/api/mentors/changeStatus", {status: status, ...properties}).then(r => {
      if(r.success) updateAndStoreUser(dispatch, r.payload);
      return r;
    })
  }
};

export const changeMenteeStatus = (status, properties) => {
  return (dispatch, getState) => {
    return api.post("/api/mentees/changeStatus", {status: status, ...properties}).then(r => {
      if(r.success) updateAndStoreUser(dispatch, r.payload);
      return r;
    })
  }
};

const updateAndStoreUser = (dispatch, user ) => {
  window.localStorage.setItem("user", JSON.stringify(user));
  dispatch(updateUser(user));
  if(user.type === "mentee") {
    dispatch(changeActiveJourneyModule(user.menteeProfile.journey.filter(m => !m.completed && m.ready)[0].typeformID));
  } else {
    dispatch(setMentorHomeProgress(user.mentorProfile.status === "requested" ? 70 : 40));
  }
};


export const registerMentor = () => {
  return (dispatch,getState) => {
    dispatch(toggleRegistering());
    const {onboarding} = getState();
    return api.post("/api/mentors/registerNew", onboarding).then(r => {
      dispatch(toggleRegistering());
      if(r.success) updateAndStoreUser(dispatch, r.payload);
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
      if(r.success) updateAndStoreUser(dispatch, r.payload);
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
      if(r.success) updateAndStoreUser(dispatch, r.payload);
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

export const setActiveMenteeApprovalId = (id) => {
  return {
    type: SET_ACTIVE_MENTEE_APPROVAL_ID,
    id: id
  }
};

export const toggleAdminFetching = () => {
  return {
    type: TOGGLE_ADMIN_FETCHING
  }
};

export const switchMatchingMode = () => {
  return {
    type: SWITCH_MATCHING_MODE
  }
};

export const setMatchingActiveId = (id) => {
  return {
    type: SET_MATCHING_ID,
    id: id
  }
};

export const setActiveChat = (id) => {
  return {
    type: SET_ACTIVE_CHAT,
    id: id
  }
};

export const toggleMessagingConnected = () => {
  return {
    type: TOGGLE_MESSAGING_CONNECTED
  }
};

export const addMessagingChat = (chat) => {
  return {
    type: ADD_MESSAGING_CHAT,
    chat: chat
  }
};
export const addMessagesToChat = (chatId, messages) => {
  return {
    type: ADD_MESSAGES_TO_CHAT,
    chatId: chatId,
    messages: messages
  }
};

export const setMentorRecommendations = (mentorRecommendations) => {
  return {
    type: SET_MENTOR_RECOMMENDATIONS,
    mentorRecommendations: mentorRecommendations
  }
};

export const showMatchingConfirmation = (id) => {
  return {
    type: SHOW_MATCHING_CONFIRMATION,
    id: id,
  }
};

export const unsetMatchingConfirmation = () => {
  return {
    type: UNSET_MATCHING_CONFIRMATION
  }
};

export const setRelationships = (relationships) => {
  return {
    type: SET_RELATIONSHIPS,
    relationships: relationships
  }
};

export const setEmailLoginSent = (email) => {
  return {
    type: SENT_LOGIN_EMAIL,
    email: email
  }
};

export const unsetLoginEmailSent = () => {
  return {
    type: UNSET_LOGIN_EMAIL
  }
};


export const sendLoginEmail = (email) => {
  return (dispatch) => {
    return api.get(`/auth/login?email=${email}`).then(r => {
      if (r.success) dispatch(setEmailLoginSent(email));
      else toast.error("There was an error requesting your magic link, sorry");
      return r;
    });
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
      return r;
    })
  }
};

export const fetchRelationships = () => {
  return (dispatch) => {
    dispatch(toggleAdminFetching());
    return api.get("/api/relationships").then(r => {
      dispatch(toggleAdminFetching());
      if(r.success){
        dispatch(setRelationships(r.payload));
      }
      return r;
    })
  }
};

export const confirmMatch = (mentorId, menteeId) => {
  return (dispatch, getState) => {
    dispatch(toggleAdminFetching());
    return api.post("/api/admin/createMatch", {mentorId: mentorId, menteeId: menteeId}).then(r => {
      dispatch(toggleAdminFetching());
      if(r.success){
        let {relationships, mentees, mentors} = getState().admin;

        relationships.push(r.payload);
        dispatch(setRelationships(relationships));

        mentees = mentees.filter(m => m._id !== menteeId);
        mentees.push(r.payload.mentee);
        dispatch(setMentees(mentees));

        mentors = mentors.filter(m => m._id !== mentorId);
        mentors.push(r.payload.mentor);
        dispatch(setMentors(mentors));

        const menteesStillToMatch = getState().admin.mentees.filter(m => m.status === "approved" && !m.relationship);
        const newMenteeMatchingId = (menteesStillToMatch.length > 0) ? menteesStillToMatch[0]._id : null;
        dispatch(changeMenteeBeingMatched(newMenteeMatchingId));
      }
      return r
    })
  }
};

export const changeMenteeBeingMatched = (id) => {
  return (dispatch) => {
    dispatch(setMatchingActiveId(id));
    return api.get(`/api/admin/matchingMentorRecommendations/${id}`).then(r => {
      if(r.success){
        dispatch(setMentorRecommendations(r.payload));
        dispatch(showMatchingConfirmation(null));
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
        if(r.payload.filter(m => m.status === "approved" && !m.relationship).length > 0) {
          const menteesStillToMatch = r.payload.filter(m => m.status === "approved" && !m.relationship);
          const newMenteeMatchingId = (menteesStillToMatch.length > 0) ? menteesStillToMatch[0]._id : null;
          dispatch(changeMenteeBeingMatched(newMenteeMatchingId));
        }
        if(r.payload.filter(m => m.status === "requested").length > 0) {
          const menteeId = r.payload.filter(m => m.status === "requested" && !m.relationship)[0]._id;
          dispatch(setActiveMenteeApprovalId(menteeId));
        }
      }
      return r;
    })
  }
};

export const adminChangeUserStatus = (type, id, status, rejectionReason) => {
  return (dispatch, getState) => {
    dispatch(toggleAdminFetching());
    return api.post("/api/admin/changeUserStatus", {id, status, type, rejectionReason}).then(r => {
      dispatch(toggleAdminFetching());
      if(type === "mentor"){
        let {mentors} = getState().admin;
        mentors = mentors.filter(m => m._id !==id);
        mentors.push(r.payload);
        if(r.success){
          dispatch(setMentors(mentors));
          mentors = getState().admin.mentors;
          if(mentors.filter(m => m.status === "requested").length > 0) dispatch(setActiveMentorApprovalId(mentors.filter(m => m.status === "requested")[0]._id));
        }
      } else {
        let {mentees} = getState().admin;
        mentees = mentees.filter(m => m._id !==id);
        mentees.push(r.payload);
        if(r.success){
          dispatch(setMentees(mentees));
          mentees = getState().admin.mentees;
          if(mentees.filter(m => m.status === "requested").length > 0) dispatch(setActiveMenteeApprovalId(mentees.filter(m => m.status === "requested")[0]._id));
        }
      }
      return r;
    })
  }
};