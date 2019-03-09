import {
  ADD_MESSAGES_TO_CHAT,
  ADD_MESSAGING_CHAT,
  ADD_ONBOARDING_PROPERTIES,
  CHANGE_STAGE,
  REMOVE_PICTURE_TO_CROP,
  REMOVE_USER, SENT_LOGIN_EMAIL, SET_ACTIVE_CHAT,
  SET_ACTIVE_MENTEE_APPROVAL_ID,
  SET_ACTIVE_MENTOR_APPROVAL_ID, SET_ACTIVE_JOURNEY_MODULE, SET_MATCHING_ID,
  SET_MENTEES, SET_MENTOR_RECOMMENDATIONS,
  SET_MENTORS,
  SET_RELATIONSHIPS, SHOW_MATCHING_CONFIRMATION,
  STORE_PICTURE_CROPPED,
  STORE_PICTURE_TO_CROP, SWITCH_MATCHING_MODE,
  TOGGLE_ADMIN_FETCHING, TOGGLE_MESSAGING_CONNECTED,
  TOGGLE_PICTURE_PICKER,
  TOGGLE_REGISTERING, UNSET_LOGIN_EMAIL, UNSET_MATCHING_CONFIRMATION,
  UPDATE_USER, SET_MENTOR_HOME_PROGRESS
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

function login(state = {
  emailSent: false,
  emailSentTo: null
}, action) {
  switch (action.type) {
    case (SENT_LOGIN_EMAIL):
      return { ...state, emailSent: true, emailSentTo: action.email };
    case (UNSET_LOGIN_EMAIL):
      return { ...state, emailSent: false, emailSentTo: null };
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
  step: 4,
  country: "Italy",
  city: "Milan",
  university: "University of Oxford",
  school: "Collegio San Carlo",
  subject: "Computer Science",
  subjects: ["Maths", "Economics", "Phylosophy", "Italian", "Biology", "English"],
  level: "Undergraduate",
  area: "Technology",
  year: "4",
  gender: "Male",
  firstGenStudent: "No",
  interestedIn: ["Maths", "PPE", "Computer Science", "Economics"],
  unisApplyingFor: ["LSE", "UCL", "Oxford", "Bath", "Southampton"],
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
      return { ...state, relationships: action.relationships };
    case SET_MENTEES:
      return { ...state, mentees: action.mentees };
    case SET_MENTORS:
      return { ...state, mentors: action.mentors };
    case TOGGLE_ADMIN_FETCHING:
      return { ...state, fetching: !state.fetching, fetched: true };
    default:
      return state;
  }
}

function mentorAdmin(state = {
  activeApprovalId: null
}, action) {
  switch (action.type) {
    case SET_ACTIVE_MENTOR_APPROVAL_ID:
      return { ...state, activeApprovalId: action.id };
    default:
      return state;
  }
}

function menteeAdmin(state = {
  activeApprovalId: null
}, action) {
  switch (action.type) {
    case SET_ACTIVE_MENTEE_APPROVAL_ID:
      return { ...state, activeApprovalId: action.id };
    default:
      return state;
  }
}

function mentorHome(state = {
  progress: getInitialMentorHomeProgress()
}, action) {
  switch (action.type) {
    case SET_MENTOR_HOME_PROGRESS:
      return { ...state, progress: action.progress };
    default:
      return state;
  }
}

const getInitialMentorHomeProgress = () => {
  try {
    const user = JSON.parse(window.localStorage.getItem("user"));
    let baseline = 10;
    if (user.emailConfirmed) baseline = baseline + 30;
    if (user.mentorProfile.status === "requested") baseline = baseline + 30;
    return baseline;
  } catch (e) {
    return null;
  }
};

function matching(state = {
  manualMode: false,
  activeId: null,
  mentorRecommendations: [],
  showConfirm: null
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

const app = combineReducers({
  user, settings, onboarding, admin, mentorAdmin, menteeAdmin, matching, messaging, login, journey, mentorHome
});

export default app;