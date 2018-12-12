import React, {Component} from "react";
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
import Settings from "./various/Settings";
import JourneyModule from "./journey/JourneyModule";
import Home from "./home/Home";
import connect from "react-redux/es/connect/connect";
import { getUser, removeUser, updateUser } from "../actions/actionCreator";

class App extends Component {

  componentDidMount() {
    const storedUser = window.localStorage.getItem("user");
    if(storedUser) this.props.updateUser(JSON.parse(storedUser))
  }

  setUser(user){
    window.localStorage.setItem("user", JSON.stringify(user));
    this.props.updateUser(user);
  };

  render() {
    const { user, removeUser, history, location} = this.props;
    return (
      <div>
        <header>
          <HeaderNavbar user={user} logout={removeUser} history={history} location={location}/>
        </header>
        <Switch>
          <Route path={"/login"} component={connect(() => {return {user}}, dispatch => {return { login: () => dispatch(getUser()) }})(Login)} />
          <Route path={"/onboard"} render={(props) => <Onboarding user={user} {...props} setUser={this.setUser}/>}/>
          <Route path={"/confirm"} render={(props) => <Confirm/>}/>
          <Route path={"/journey/:id"} render={(props) => <JourneyModule {...props} />}/>
          <Route path={"/settings"} render={(props) => <Settings user={user} {...props} setUser={this.setUser}/>}/>
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
