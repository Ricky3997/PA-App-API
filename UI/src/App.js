import React, {Component} from 'react';
import './App.css'
import HeaderNavbar from "./various/HeaderNavbar";
import LoggedInApp from "./various/LoggedInApp";
import Onboarding from "./various/Onboarding";
import Login from "./various/Login";
import {Route, Switch} from "react-router-dom";
import Confirm from "./various/Confirm";
const queryString = require('query-string');
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

    componentDidMount() {
        if(this.state.status !== "logged-in" && this.props.location.pathname === "/") this.props.history.push("/onboard")
        // if(this.state.status !== "logged-in"){
        // const token = (window.localStorage.getItem("token")) || queryString.parse(window.location.search).token;
        // if(token) this.validate(token);
        // }
    }

    getUserDetails(){
        api.get("/api/users/profile",).then(r => {
            this.setState({status: "logged-in", user: r.user, mentor: r.mentor});
            //window.location.href = window.location.href.split("?")[0];
        })

    }

    validate(token){
        const email = window.localStorage.getItem("email");
        api.post("/auth/validate", JSON.stringify({email: email, token: token})).then(r => {
            if(r.valid) {
                window.localStorage.setItem("token", token);
                this.getUserDetails();
            }
            else alert("failure")
        })
    }

    logout(){
        window.localStorage.removeItem("token");
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
                    <Route path={"/login"} render={(props) => <Login/>} />
                    <Route path={"/onboard"} render={(props) => <Onboarding/>} />
                    <Route path={"/confirm"} render={(props) => <Confirm/>} />
                </Switch>
                }
            </div>
        );
    }
}

export default App;
