import React, {Component} from 'react';
import './App.css'
import HeaderNavbar from "./various/HeaderNavbar";
import LoggedInApp from "./various/LoggedInApp";
import Onboarding from "./various/Onboarding";
import Login from "./various/Login";
const queryString = require('query-string');


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: "onboarding"
        };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.onboard = this.onboard.bind(this);
        this.getUserDetails = this.getUserDetails.bind(this);
    }

    componentDidMount() {
        if(this.state.status !== "logged-in"){
        const token = (window.localStorage.getItem("token")) || queryString.parse(window.location.search).token;
        if(token) this.validate(token);
        }
    }

    getUserDetails(){
        fetch("/api/users/profile",{
            headers: {'Authorization': `Bearer ${window.localStorage.getItem("token")}`},
        }).then(res => res.json()).then(r => {
            this.setState({status: "logged-in", user: r.user, mentor: r.mentor});
            //window.location.href = window.location.href.split("?")[0];
        })

    }

    validate(token){
        const email = window.localStorage.getItem("email");
        fetch("/auth/validate", {
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify({email: email, token: token})
        }).then(res => res.json()).then(r => {
            if(r.valid) {
                window.localStorage.setItem("token", token);
                this.getUserDetails();
            }
            else alert("failure")
        })
    }

    login(){
        this.setState({status: "login"});
    }

    onboard(){
        this.setState({status: "onboarding"});
    }

    logout(){
        window.localStorage.removeItem("token");
        this.setState({status: "onboarding", mentor: null, user: null});
    }

    render() {
        let toRender;
        switch (this.state.status) {
            case "logged-in":
                toRender = <LoggedInApp {...this.state} />;
                break;
            case "login":
                toRender = <Login />;
                break;
            case "onboarding":
            default:
                toRender = <Onboarding />;
        }
        return (
            <div>
                <header>
                    <HeaderNavbar {...this.state} login={this.login} logout={this.logout} onboard={this.onboard}/>
                </header>
                {toRender}
            </div>
        );
    }
}

export default App;
