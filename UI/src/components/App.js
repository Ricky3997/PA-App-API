import React, { Component } from "react";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import "../assets/App.css";
import Header from "./various/Header";
import Onboarding from "./onboarding/Onboarding";
import Login from "./various/Login";
import { Route, Switch } from "react-router-dom";
import Confirm from "./various/Confirm";
import MentorProfile from "./people/MentorTile";
import Call from "./call/Call";
import Messaging from "./messaging/Messaging";
import Admin from "./admin/Admin";
import Settings from "./settings/Settings";
import JourneyModule from "./journey/JourneyModule";
import Home from "./home/Home";
import About from "./various/About";
import "react-toastify/dist/ReactToastify.css";

import {
  addMessagesToChat,
  addMessagingChat,
  addOnboardingProperties,
  changeActiveJourneyModule,
  changeMenteeStatus,
  changeMentorStatus,
  changeStage,
  confirmEmailAddress,
  fetchMentees,
  fetchMentors,
  fetchRelationships,
  getUser,
  registerMentee,
  registerMentor,
  removePictureToCrop,
  saveSettings,
  sendEmailConfirmationAgain,
  sendLoginEmail,
  setActiveChat,
  setMentorApprovalProperties,
  setMentorHomeProgress,
  storePictureCropped,
  storePictureToCrop,
  toggleMentorHomeModal,
  toggleMessagingConnected,
  togglePicturePicker,
  unsetLoginEmailSent,
  updateUser
} from "../actions/actionCreator";
import Footer from "./various/Footer";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

class App extends Component {
  render() {
    const { user, removeUser, history, location } = this.props;
    return (
      <div id="root_div">
        <Header user={user} logout={removeUser} history={history} location={location}/>
        <Container fluid id="root_container">
          <Switch>

            <Route path={"/login"} component={connect(({ user, login }) => {
              return { user, login };
            }, dispatch => {
              return {
                sendLoginEmail: (email) => dispatch(sendLoginEmail(email)),
                getUser: () => dispatch(getUser()),
                unsetLoginEmailSent: () => dispatch(unsetLoginEmailSent()),
              };
            })(Login)}/>

            <Route path={"/settings"} component={connect(({ settings, user }) => {
              return { settings, user };
            }, dispatch => {
              return {
                updateUser: (user) => dispatch(updateUser(user)),
                togglePicturePicker: () => dispatch(togglePicturePicker()),
                storePictureToCrop: (pictureToCrop) => dispatch(storePictureToCrop(pictureToCrop)),
                removePictureToCrop: () => dispatch(removePictureToCrop()),
                storePictureCropped: (pictureCropped) => dispatch(storePictureCropped(pictureCropped)),
                saveSettings: (settings) => dispatch(saveSettings(settings)),
                sendEmailConfirmationAgain: (settings) => dispatch(sendEmailConfirmationAgain(settings))
              };
            })(Settings)}/>

            <Route path={"/onboard"} component={connect(({ user, onboarding }) => {
              return { user, onboarding };
            }, dispatch => {
              return {
                updateUser: (user) => dispatch(updateUser(user)),
                changeStage: (change) => dispatch(changeStage(change)),
                addOnboardingProperties: (properties) => dispatch(addOnboardingProperties(properties)),
                registerMentor: () => dispatch(registerMentor()),
                registerMentee: () => dispatch(registerMentee())
              };
            })(Onboarding)}/>

            <Route path={"/journey/:id"} component={connect(({ user }) => {
              return {  user };
            }, dispatch => {
              return {
              };
            })(JourneyModule)}/>

            <Route path={"/message"}  component={connect(({ user }) => {
              return {  user };
            }, dispatch => {
              return {
                toggleMessagingConnected: () => dispatch(toggleMessagingConnected()),
                addMessagingChat: (chat) => dispatch(addMessagingChat(chat)),
                addMessagesToChat: (chatId, messages) => dispatch(addMessagesToChat(chatId, messages)),
                setActiveChatId: (id) => dispatch(setActiveChat(id))
              };
            })(Messaging)}/>

            <Route path={"/call"} render={(props) => <Call user={user} {...props} />}/>
            <Route path={"/mentor/:id"} exact render={(props) => <MentorProfile {...props} />}/>
            <Route path={"/about"} component={About}/>
            <Route path={"/confirm"} component={connect(null, dispatch => {
              return {
                confirmEmailAddress: (token, id) => dispatch(confirmEmailAddress(token, id))
              };
            })(Confirm)}/>


            <Route path={"/admin/:section?"} component={connect(({ user, admin }) => {
              return { user, admin };
            }, dispatch => {
              return {
                fetchMentors: () => dispatch(fetchMentors()),
                fetchRelationships: () => dispatch(fetchRelationships()),
                fetchMentees: () => dispatch(fetchMentees())
              };
            })(Admin)}/>

            <Route component={connect(({ user, journey, mentorHome }) => {
              return { user, journey, mentorHome };
            }, dispatch => {
              return {
                changeMentorStatus: (status, properties) => dispatch(changeMentorStatus(status, properties)),
                changeMenteeStatus: (status) => dispatch(changeMenteeStatus(status)),
                refreshUser: () => dispatch(getUser()),
                changeActiveJourneyModule: (id) => dispatch(changeActiveJourneyModule(id)),
                setMentorHomeProgress: (progress) => dispatch(setMentorHomeProgress(progress)),
                toggleMentorHomeModal: () => dispatch(toggleMentorHomeModal()),
                setMentorApprovalProperties: (properties) => dispatch(setMentorApprovalProperties(properties)),
              };
            })(Home)}/>

          </Switch>
          <ToastContainer/>
        </Container>
        <Footer history={history}/>
      </div>
    );
  }
};

export default App;
