import React from "react";
import MentorHome from "./MentorHome";
import MenteeHome from "./MenteeHome";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
    changeActiveJourneyModule,
    changeMenteeStatus,
    changeMentorStatus,
    getUser,
    setMenteeApprovalProperties,
    setMentorApprovalProperties,
    setMentorHomeProgress,
    toggleMenteeHomeModal,
    toggleMentorHomeModal
} from "../../actions/actionCreator";

const Home = (props) => {
    if(!props.user) return <Redirect to={'/onboard'} />;
    else if(props.user.type === "mentor"){
        const MentorHomeConnected = connect(({ user,mentorHome }) => {
            return { user, mentorHome };
        }, dispatch => {
            return {
                changeMentorStatus: (status, properties) => dispatch(changeMentorStatus(status, properties)),
                refreshUser: () => dispatch(getUser()),
                setMentorHomeProgress: (progress) => dispatch(setMentorHomeProgress(progress)),
                toggleMentorHomeModal: () => dispatch(toggleMentorHomeModal()),
                setMentorApprovalProperties: (properties) => dispatch(setMentorApprovalProperties(properties)),
            };
        })(MentorHome);
        return <MentorHomeConnected/>;
    }
    else {
        const MenteeHomeConnected = connect(({ user, journey, menteeHome }) => {
            return { user, journey, menteeHome };
        }, dispatch => {
            return {
                changeMenteeStatus: (status, properties) => dispatch(changeMenteeStatus(status, properties)),
                refreshUser: () => dispatch(getUser()),
                changeActiveJourneyModule: (id) => dispatch(changeActiveJourneyModule(id)),
                toggleMenteeHomeModal: () => dispatch(toggleMenteeHomeModal()),
                setMenteeApprovalProperties: (properties) => dispatch(setMenteeApprovalProperties(properties))
            };
        })(MenteeHome);
        return <MenteeHomeConnected />
    }
};

export default Home;
