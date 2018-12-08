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
const api = require("./api");

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "logged-out",
            user: null,
            mentor: null
        };
        this.logout = this.logout.bind(this);
        this.getUserDetails = this.getUserDetails.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.redirectOnRoot(nextProps)
    }

    redirectOnRoot(props){
        if(props.location.pathname === "/") {
            if(this.state.status === "logged-out") props.history.push("/onboard")
            if(this.state.status === "logged-in") props.history.push("/home")
        }
    }

    componentDidMount() {
        const token = window.localStorage.getItem("token"), id = window.localStorage.getItem("id");
        if(token !== null && id !== null){
            this.setState({status: "logging-in"});
            this.validate(id, token)
        } else this.redirectOnRoot(this.props);
    }

    getUserDetails(){
        api.get("/api/users/profile").then(r => {
            this.setState({status: "logged-in", user: r.payload.user, mentor: r.payload.mentor}, () => {
                const currentPath = this.props.location.pathname;
                this.props.history.push({pathname: currentPath === "/login" ? "/" : currentPath, search: ''})
            });

        })

    }

    validate(id, token){
        api.post("/auth/validate", {id: id, token: token}).then(r => {
            if(r.success) {
                if(r.payload.valid) {
                    window.localStorage.setItem("token", token);
                    window.localStorage.setItem("id", id);
                    this.getUserDetails();
                } else {
                    window.localStorage.removeItem("token");
                    window.localStorage.removeItem("id");
                    this.props.history.push("/login");
                }
            }
            else {
                this.props.history.push("/login");
            }
        })
    }

    logout(){
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("id");
        this.setState({status: "logged-out", mentor: null, user: null}, () => {
            this.props.history.push("/");
        });

    }

    render() {
        return (
            <div>
                <header>
                    <HeaderNavbar {...this.state} {...this.props} logout={this.logout}/>
                </header>
                <Switch>
                    <Route path={"/home"} render={(props) => <Home {...this.state} {...props} />} />
                    <Route path={"/login"} render={(props) => <Login validate={this.validate}/>} />
                    <Route path={"/onboard"} render={(props) => <Onboarding {...this.state} {...props} />} />
                    <Route path={"/confirm"} render={(props) => <Confirm/>} />
                    <Route path={"/journey/:id"} render={(props) => <JourneyModule {...props} /> } />
                    <Route path={"/settings"} render={(props) => <Settings {...this.state} {...props} />} />
                    <Route path={"/admin/:section?"} render={(props) =>  <Admin {...this.state} {...props} />} />
                    <Route path={"/message"} render={(props) => <Message {...this.state} {...props} />} />
                    <Route path={"/call"} render={(props) => <Call {...this.state} {...props} />} />
                    <Route path={"/mentor/:id"} exact render={(props) => <MentorProfile {...props} />} />
                    <Redirect to={"/"} />
                </Switch>
            </div>
        );
    }
}

export default App;
