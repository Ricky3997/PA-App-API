import React, {Component} from 'react';
import './App.css'
import HeaderNavbar from "./various/HeaderNavbar";
import Onboarding from "./onboarding/Onboarding";
import Login from "./various/Login";
import {Redirect, Route, Switch} from "react-router-dom";
import Confirm from "./various/Confirm";
import MentorProfile from "./people/MentorProfile";
import Call from "./call/Call";
import Message from "./message/Message";
import Admin from "./admin/Admin";
import Settings from "./various/Settings";
import JourneyModule from "./journey/JourneyModule";
import Home from "./home/Home";
import AuthenticatedRoute from "./various/AuthenticatedRoute";
const api = require("./api");

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined
        };
        this.logout = this.logout.bind(this);
        this.setUser = this.setUser.bind(this);
    }

    logout(){
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("id");
        this.setState({user: undefined});
    }

    setUser(u){
        this.setState({user: u});
    }

    render() {
        return (
            <div>
                <header>
                    <HeaderNavbar {...this.state} {...this.props} logout={this.logout}/>
                </header>
                <Switch>
                    <Route path={"/login"} render={(props) => <Login {...props} />} />
                    <Route path={"/onboard"} render={(props) => <Onboarding editUserDetails={this.setUser} {...this.state} {...props} />} />
                    <Route path={"/confirm"} render={(props) => <Confirm/>} />
                    <Route path={"/journey/:id"} render={(props) => <JourneyModule {...props} /> } />
                    <Route path={"/settings"} render={(props) => <Settings {...this.state} {...props} editUserDetails={this.setUser} />} />
                    <Route path={"/admin/:section?"} render={(props) =>  <Admin {...this.state} {...props} />} />
                    <Route path={"/message"} render={(props) => <Message {...this.state} {...props} />} />
                    <Route path={"/call"} render={(props) => <Call {...this.state} {...props} />} />
                    <Route path={"/mentor/:id"} exact render={(props) => <MentorProfile {...props} />} />
                    <Route render={(props) => <Home {...this.state} {...props} />} />
                    {/*<AuthenticatedRoute/>*/}
                </Switch>
            </div>
        );
    }
}

export default App;
