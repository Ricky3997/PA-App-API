import {
  ADD_ONBOARDING_PROPERTIES,
  CHANGE_STAGE,
  REMOVE_PICTURE_TO_CROP,
  REMOVE_USER,
  SET_ACTIVE_MENTEE_APPROVAL_ID,
  SET_ACTIVE_MENTOR_APPROVAL_ID,
  SET_MENTEES,
  SET_MENTORS,
  SET_RELATIONSHIPS,
  STORE_PICTURE_CROPPED,
  STORE_PICTURE_TO_CROP,
  TOGGLE_ADMIN_FETCHING,
  TOGGLE_PICTURE_PICKER,
  TOGGLE_REGISTERING,
  UPDATE_USER
} from "../actions/actionTypes";
import { combineReducers } from "redux";

function user(state = JSON.parse(window.localStorage.getItem("user")) || null, action) {
  switch (action.type) {
    case (UPDATE_USER):
      return action.user;
    case (REMOVE_USER):
      return null;
    default:
      return state;
  }
}

function settings(state = {
  showPicturePicker: false,
  pictureToCrop: null,
  pictureCropped: null
}, action) {
  switch (action.type) {
    case (TOGGLE_PICTURE_PICKER):
      return { ...state, showPicturePicker: !state.showPicturePicker };
    case (STORE_PICTURE_CROPPED):
      return { ...state, pictureCropped: action.pictureCropped };
    case (STORE_PICTURE_TO_CROP):
      return { ...state, pictureToCrop: action.pictureToCrop };
    case (REMOVE_PICTURE_TO_CROP):
      return { ...state, pictureToCrop: null };
    default:
      return state;
  }
}

function onboarding(state = {
  step: 1,
  country: "",
  city: "",
  university: "",
  school: "",
  subject: "",
  subjects: [],
  level: "",
  area: "",
  year: "",
  gender: "",
  firstGenStudent: "",
  interestedIn: [],
  unisApplyingFor: [],
  registering: false
}, action) {
  switch (action.type) {
    case TOGGLE_REGISTERING:
      return { ...state, registering: !state.registering };
    case ADD_ONBOARDING_PROPERTIES:
      return { ...state, ...action.properties };
    case CHANGE_STAGE:
      return { ...state, step: action.change };
    default:
      return state;
  }
}

function admin(state = {
  fetching: false,
  fetched: false,
  mentors: [],
  relationships: [],
  mentees: []
}, action) {
  switch (action.type) {
    case SET_RELATIONSHIPS:
      return {...state, relationships: action.relationships};
    case SET_MENTEES:
      return {...state, mentees: action.mentees};
    case SET_MENTORS:
      return {...state, mentors: action.mentors};
    case TOGGLE_ADMIN_FETCHING:
      return {...state, fetching: !state.fetching, fetched: true};
    default:
      return state;
  }
}
function mentorAdmin(state = {
  activeApprovalId: null
}, action) {
  switch (action.type) {
    case SET_ACTIVE_MENTOR_APPROVAL_ID:
      return {...state, activeApprovalId: action.id};
    default:
      return state;
  }
}
function menteeAdmin(state = {
  activeApprovalId: null
}, action) {
  switch (action.type) {
    case SET_ACTIVE_MENTEE_APPROVAL_ID:
      return {...state, activeApprovalId: action.id};
    default:
      return state;
  }
}

const app = combineReducers({
  user, settings, onboarding, admin, mentorAdmin, menteeAdmin
});

export default app;