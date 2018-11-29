import React, {Component} from 'react';
import './App.css'
import HeaderNavbar from "./various/HeaderNavbar";
import LoggedInApp from "./various/LoggedInApp";
import Onboarding from "./various/Onboarding";
import Login from "./various/Login";
import {Route, Switch} from "react-router-dom";
import Confirm from "./various/Confirm";
import _ from 'lodash';
const api = require("./api");


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: "logged-out"
        };
        this.logout = this.logout.bind(this);
        this.getUserDetails = this.getUserDetails.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.redirectToOnboardingIfLoggedOut(nextProps)
    }

    redirectToOnboardingIfLoggedOut(props){
        if(this.state.status === "logged-out"  && props.location.pathname === "/") {
            props.history.push("/onboard")
        }
    }



    componentDidMount() {
        const token = window.localStorage.getItem("token"), id = window.localStorage.getItem("id");
        if(token !== null && id !== null){
            this.setState({status: "logging-in"});
            this.validate(id, token)
        } else this.redirectToOnboardingIfLoggedOut(this.props);
    }

    getUserDetails(){
        api.get("/api/users/profile").then(r => {
            this.setState({status: "logged-in", user: r.user, mentor: r.mentor});
            this.props.history.push({pathname: '/home', search: ''})
        })

    }

    validate(id, token){
        api.post("/auth/validate", {id: id, token: token}).then(r => {
            if(r.valid) {
                window.localStorage.setItem("token", token);
                this.getUserDetails();
            }
            else alert("failure")
        })
    }

    logout(){
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("id");
        this.setState({status: "logged-out", mentor: null, user: null});
    }

    render() {
        return (
            <div>
                <header>
                    <HeaderNavbar {...this.state} {...this.props}/>
                </header>
                {this.state.status === "logged-in" ? <LoggedInApp {...this.state} /> :
                <Switch>
                    <Route path={"/login"} render={(props) => <Login validate={this.validate}/>} />
                    <Route path={"/onboard"} render={(props) => <Onboarding/>} />
                    <Route path={"/confirm"} render={(props) => <Confirm/>} />
                </Switch>
                }
            </div>
        );
    }
}

export default App;
