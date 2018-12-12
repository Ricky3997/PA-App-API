import React, { Component } from "react";
import {connect} from "react-redux"
import "../assets/App.css";
import HeaderNavbar from "./various/HeaderNavbar";
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
  getUser,
  togglePicurePicker,
  storePictureToCrop,
  removePictureToCrop,
  storePictureCropped,
  updateUser
} from "../actions/actionCreator";

class App extends Component {

  setUser(user) {
    window.localStorage.setItem("user", JSON.stringify(user));
    this.props.updateUser(user);
  };

  render() {
    const { user, removeUser, history, location } = this.props;
    return (
      <div>
        <header>
          <HeaderNavbar user={user} logout={removeUser} history={history} location={location}/>
        </header>
        <Switch>

          <Route path={"/login"} component={connect(() => {
            return { user }
          }, dispatch => {
            return { login: () => dispatch(getUser()) }
          })(Login)}/>

          <Route path={"/settings"} component={connect(({ settings, user }) => {
              return { settings, user }
            },
            dispatch => {
              return {
                updateUser: (user) => dispatch(updateUser(user)),
                togglePicturePicker: () => dispatch(togglePicurePicker()),
                storePictureToCrop: (pictureToCrop) => dispatch(storePictureToCrop(pictureToCrop)),
                removePictureToCrop: () => dispatch(removePictureToCrop()),
                storePictureCropped: (pictureCropped) => dispatch(storePictureCropped(pictureCropped))
              }
            })(Settings)}/>


          <Route path={"/onboard"} render={(props) => <Onboarding user={user} {...props} setUser={this.setUser}/>}/>
          <Route path={"/confirm"} render={(props) => <Confirm/>}/>
          <Route path={"/journey/:id"} render={(props) => <JourneyModule {...props} />}/>
          <Route path={"/admin/:section?"} render={(props) => <Admin user={user} {...props} />}/>
          <Route path={"/message"} render={(props) => <Message user={user} {...props} />}/>
          <Route path={"/call"} render={(props) => <Call user={user} {...props} />}/>
          <Route path={"/mentor/:id"} exact render={(props) => <MentorProfile {...props} />}/>
          <Route render={(props) => <Home user={user} {...props} />}/>

          {/*<AuthenticatedRoute/>*/}
        </Switch>
      </div>
    );
  }

};

export default App;
