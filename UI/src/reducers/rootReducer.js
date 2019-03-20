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
  SET_MATCHING_ID,
  SET_MENTEE_APPROVAL_PROPERTIES,
  SET_MENTEES,
  SET_MENTOR_APPROVAL_PROPERTIES,
  SET_MENTOR_HOME_PROGRESS,
  SET_MENTOR_RECOMMENDATIONS,
  SET_MENTORS,
  SET_PUBLIC_PROFILE,
  SET_RELATIONSHIPS,
  SHOW_MATCHING_CONFIRMATION,
  STORE_PICTURE_CROPPED,
  STORE_PICTURE_TO_CROP,
  SWITCH_MATCHING_MODE,
  TOGGLE_ADMIN_FETCHING,
  TOGGLE_ADMIN_MODAL,
  TOGGLE_DASHBOARD_CONFIRMATION,
  TOGGLE_MENTEE_HOME_MODAL,
  TOGGLE_MENTOR_CONFIRM_DECISION,
  TOGGLE_MENTOR_HOME_MODAL,
  TOGGLE_MESSAGING_CONNECTED,
  TOGGLE_PICTURE_PICKER,
  TOGGLE_REGISTERING,
  TOGGLE_SHOW_MATCHING_DETAILS_MODAL,
  UNSET_LOGIN_EMAIL,
  UNSET_MATCHING_CONFIRMATION,
  UNSET_PUBLIC_PROFILE,
  UPDATE_USER
} from "../actions/actionTypes";
import { combineReducers } from "redux";
import * as _ from "lodash";

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

function login(state = {
  emailSentTo: null
}, action) {
  switch (action.type) {
    case (SENT_LOGIN_EMAIL):
      return { ...state, emailSentTo: action.email };
    case (UNSET_LOGIN_EMAIL):
      return { ...state, emailSentTo: null };
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
  mentees: [],
  showModal: false
}, action) {
  switch (action.type) {
    case SET_RELATIONSHIPS:
      return { ...state, relationships: action.relationships };
    case SET_MENTEES:
      return { ...state, mentees: action.mentees };
    case SET_MENTORS:
      return { ...state, mentors: action.mentors };
    case TOGGLE_ADMIN_FETCHING:
      return { ...state, fetching: !state.fetching, fetched: true };
    case TOGGLE_ADMIN_MODAL:
      return { ...state, showModal: !state.showModal };
    default:
      return state;
  }
}

function menteeHome(state = {
  showModal: false,
  maxNumberOfMentees: 3,
  careerInterests: [],
  confirmCommittment: false,
  ethnicBackground: "",
  fromThreeLargestCity: 1,
  hobbiesAndInterests: [],
  referral: [],
  typeOfHighSchool: "",
  yearBorn: null,
  yearStart: null,
  notes: ""
}, action) {
  switch (action.type) {
    case TOGGLE_MENTEE_HOME_MODAL:
      return { ...state, showModal: !state.showModal };
    case SET_MENTEE_APPROVAL_PROPERTIES:
      return { ...state, ...action.properties };
    default:
      return state;
  }
}

function mentorHome(state = {
  progress: getInitialMentorHomeProgress(),
  showModal: false,
  showConfirmDecision: "",
  maxNumberOfMentees: 3,
  careerInterests: [],
  confirmCommittment: false,
  ethnicBackground: "",
  fromThreeLargestCity: 1,
  hobbiesAndInterests: [],
  linkedinUrl: "",
  offersFromUnis: [],
  referral: [],
  subjectsInSchool: [],
  typeOfHighSchool: "",
  yearBorn: null,
  yearGraduation: null,
  notes: ""
}, action) {
  switch (action.type) {
    case SET_MENTOR_HOME_PROGRESS:
      return { ...state, progress: action.progress };
    case TOGGLE_MENTOR_HOME_MODAL:
      return { ...state, showModal: !state.showModal };
    case SET_MENTOR_APPROVAL_PROPERTIES:
      return { ...state, ...action.properties };
    case TOGGLE_MENTOR_CONFIRM_DECISION:
      return { ...state, showConfirmDecision: action.showConfirmDecision };
    default:
      return state;
  }
}

const getInitialMentorHomeProgress = () => {
  try {
    const user = JSON.parse(window.localStorage.getItem("user"));
    let baseline = 10;
    if (user.emailConfirmed) baseline = baseline + 20;
    if (user.mentorProfile.status === "requested") baseline = baseline + 20;
    if (user.mentorProfile.status === "approved") baseline = baseline + 40;
    if (_.get(user, "mentorProfile.relationship.length") > 0) baseline = 100;
    return baseline;
  } catch (e) {
    return 10;
  }
};

function matching(state = {
  manualMode: true,
  activeId: null,
  mentorRecommendations: [],
  showConfirm: null,
  showDetailsModal: false
}, action) {
  switch (action.type) {
    case SET_MATCHING_ID:
      return { ...state, activeId: action.id, mentorRecommendations: [] };
    case SET_MENTOR_RECOMMENDATIONS:
      return { ...state, mentorRecommendations: action.mentorRecommendations };
    case SWITCH_MATCHING_MODE:
      return { ...state, manualMode: !state.manualMode };
    case SHOW_MATCHING_CONFIRMATION:
      return { ...state, showConfirm: action.id };
    case TOGGLE_SHOW_MATCHING_DETAILS_MODAL:
      return { ...state, showDetailsModal: action.id };
    case UNSET_MATCHING_CONFIRMATION:
      return { ...state, showConfirm: null };
    default:
      return state;
  }
}

function messaging(state = {
  connected: false,
  chats: [],
  activeChatId: null
}, action) {
  switch (action.type) {
    case TOGGLE_MESSAGING_CONNECTED:
      return { ...state, connected: !state.connected };
    case SET_ACTIVE_CHAT:
      return { ...state, activeChatId: action.id };
    case ADD_MESSAGING_CHAT:
      const chats = state.chats;
      chats.push(action.chat);
      return { ...state, chats: chats };
    case ADD_MESSAGES_TO_CHAT:

      const chat = state.chats.filter(c => c.id === action.chatId)[0];
      chat.messages = [...chat.messages, ...action.messages];

      const chatsUpdated = state.chats.filter(c => c.id !== action.chatId);
      chatsUpdated.push(chat);

      return { ...state, chats: chatsUpdated };
    default:
      return state;
  }
}

const getInitialJourneyState = () => {
  try {
    const journey = JSON.parse(window.localStorage.getItem("user")).menteeProfile.journey;
    return journey.filter(m => !m.completed && m.ready)[0].typeformID;
  } catch (e) {
    return null;
  }
};


function journey(state = {
  activeId: getInitialJourneyState()
}, action) {
  switch (action.type) {
    case SET_ACTIVE_JOURNEY_MODULE:
      return { ...state, activeId: action.id };
    default:
      return state;
  }
}

function dashboard(state = {
  showConfirmation: false
}, action) {
  switch (action.type) {
    case TOGGLE_DASHBOARD_CONFIRMATION:
      return { ...state, showConfirmation: !state.showConfirmation };
    default:
      return state;
  }
}


function publicProfile(state = {
  profile: null
}, action) {
  switch (action.type) {
    case SET_PUBLIC_PROFILE:
      return { ...state, profile: action.profile };
    case UNSET_PUBLIC_PROFILE:
      return { ...state, profile: null };
    default:
      return state;
  }
}

const app = combineReducers({
  user,
  settings,
  onboarding,
  admin,
  matching,
  messaging,
  login,
  journey,
  mentorHome,
  menteeHome,
  dashboard,
  publicProfile
});

export default app;