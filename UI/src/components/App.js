import React, { Component } from "react";
import { connect } from "react-redux";
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
import {
  addOnboardingProperties,
  changeStage,
  getUser, registerMentor,
  removePictureToCrop, saveMentorSettings,
  storePictureCropped,
  storePictureToCrop,
  togglePicurePicker,
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
                togglePicturePicker: () => dispatch(togglePicurePicker()),
                storePictureToCrop: (pictureToCrop) => dispatch(storePictureToCrop(pictureToCrop)),
                removePictureToCrop: () => dispatch(removePictureToCrop()),
                storePictureCropped: (pictureCropped) => dispatch(storePictureCropped(pictureCropped)),
                saveMentorSettings: (settings) => dispatch(saveMentorSettings(settings))
              };
            })(Settings)}/>
            <Route path={"/onboard"} component={connect(({ user, onboarding }) => {
              return { user, onboarding };
            }, dispatch => {
              return {
                updateUser: (user) => dispatch(updateUser(user)),
                changeStage: (change) => dispatch(changeStage(change)),
                addOnboardingProperties: (properties) => dispatch(addOnboardingProperties(properties)),
                registerMentor: () => dispatch(registerMentor())
              };
            })(Onboarding)}/>

            <Route path={"/confirm"} render={(props) => <Confirm/>}/>
            <Route path={"/journey/:id"} render={(props) => <JourneyModule {...props} />}/>
            <Route path={"/admin/:section?"} render={(props) => <Admin user={user} {...props} />}/>
            <Route path={"/message"} render={(props) => <Message user={user} {...props} />}/>
            <Route path={"/call"} render={(props) => <Call user={user} {...props} />}/>
            <Route path={"/mentor/:id"} exact render={(props) => <MentorProfile {...props} />}/>
            <Route render={(props) => <Home user={user} {...props} />}/>
          </Switch>
        </Container>
        <Footer/>
      </div>
    );
  }

};

export default App;
