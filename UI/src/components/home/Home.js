import React from "react";
import MentorHome from "./MentorHome";
import MenteeHome from "./MenteeHome";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  changeActiveJourneyModule,
  changeMenteeStatus,
  changeMentorStatus,
  getUser
} from "../../actions/actionCreator";

const Home = (props) => {
  if (!props.user) return <Redirect to={"/onboard"}/>;
  else if (props.user.type === "mentor") {
    const MentorHomeConnected = connect(({ user, mentorHome }) => {
      return { user, mentorHome, history: props.history };
    }, dispatch => {
      return {
        changeMentorStatus: (status, properties) => dispatch(changeMentorStatus(status, properties)),
        refreshUser: () => dispatch(getUser()),
      };
    })(MentorHome);
    return <MentorHomeConnected/>;
  } else {
    const MenteeHomeConnected = connect(({ user, journey, menteeHome }) => {
      return { user, journey, menteeHome, history: props.history };
    }, dispatch => {
      return {
        changeMenteeStatus: (status, properties) => dispatch(changeMenteeStatus(status, properties)),
        refreshUser: () => dispatch(getUser()),
        changeActiveJourneyModule: (id) => dispatch(changeActiveJourneyModule(id)),
      };
    })(MenteeHome);
    return <MenteeHomeConnected/>;
  }
};

export default Home;
