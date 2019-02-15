import React, { Component } from "react";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import "../assets/App.css";
import Header from "./various/Header";
import Onboarding from "./onboarding/Onboarding";
import Login from "./various/Login";
import { Route, Switch } from "react-router-dom";
import Confirm from "./various/Confirm";
import MentorProfile from "./people/MentorProfile";
import Call from "./call/Call";
import Message from "./message/Message";
import Admin from "./admin/Admin";
import Settings from "./settings/Settings";
import JourneyModule from "./journey/JourneyModule";
import Home from "./home/Home";
import About from "./various/About";

import {
  addOnboardingProperties, changeMenteeStatus, changeMentorStatus,
  changeStage, fetchMentees, fetchMentors, fetchRelationships,
  getUser, registerMentee,
  registerMentor,
  removePictureToCrop,
  saveSettings,
  storePictureCropped,
  storePictureToCrop,
  togglePicturePicker,
  updateUser
} from "../actions/actionCreator";
import Footer from "./various/Footer";
import { Container } from "react-bootstrap";

class App extends Component {

  render() {
    const { user, removeUser, history, location } = this.props;
    return (
      <div id="root_div">
        <Header user={user} logout={removeUser} history={history} location={location}/>
        <Container fluid id="root_container">
          <Switch>

            <Route path={"/login"} component={connect(({ user }) => {
              return { user };
            }, dispatch => {
              return { login: () => dispatch(getUser()) };
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
                saveSettings: (settings) => dispatch(saveSettings(settings))
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

            <Route path={"/confirm"} render={(props) => <Confirm/>}/>
            <Route path={"/journey/:id"} component={connect(({ user }) => {
              return {  user };
            }, dispatch => {
              return {
              };
            })(JourneyModule)}/>

            <Route path={"/message"} render={(props) => <Message user={user} {...props} />}/>
            <Route path={"/call"} render={(props) => <Call user={user} {...props} />}/>
            <Route path={"/mentor/:id"} exact render={(props) => <MentorProfile {...props} />}/>
            <Route path={"/about"} component={About}/>


            <Route path={"/admin/:section?"} component={connect(({ user, admin }) => {
              return { user, admin };
            }, dispatch => {
              return {
                fetchMentors: () => dispatch(fetchMentors()),
                fetchRelationships: () => dispatch(fetchRelationships()),
                fetchMentees: () => dispatch(fetchMentees())
              };
            })(Admin)}/>

            <Route component={connect(({ user }) => {
              return { user };
            }, dispatch => {
              return {
                changeMentorStatus: (status) => dispatch(changeMentorStatus(status)),
                changeMenteeStatus: (status) => dispatch(changeMenteeStatus(status)),
                refreshUser: () => dispatch(getUser())
              };
            })(Home)}/>

          </Switch>
        </Container>
        <Footer history={history}/>
      </div>
    );
  }
};

export default App;
