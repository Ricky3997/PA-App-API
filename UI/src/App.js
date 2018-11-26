import React, {Component} from 'react';
import {Icon} from 'react-fa'
import {Breadcrumb, Col, Container, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {Route} from "react-router-dom";
import Logo from './pa_key_white.png'
import './App.css'
import UserCircle from "./various/UserCircle";
import Mentoring from "./mentoring/Mentoring";
import JourneyModule from "./journey/JourneyModule";
import Settings from "./various/Settings";
import Admin from "./admin/Admin";
import Message from "./message/Message";
import Call from "./call/Call";
import MentorProfile from "./people/MentorProfile";
import HeaderNavbar from "./various/HeaderNavbar";
import LoggedInApp from "./various/LoggedInApp";
import Onboarding from "./various/Onboarding";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: "logged-out"
        };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.login();
    }

    login(){
        fetch("/api/auth/login")
            .then(res => res.json())
            .then(r => this.setState({status: "logged-in", user: r.user, mentor: r.mentor}))
    }

    logout(){
        fetch("/api/auth/logout")
            .then(res => res.json())
            .then(r => this.setState({status: "logged-out", mentor: null, user: null}))
    }

    render() {
        return (
            <div>
                <header>
                    <HeaderNavbar {...this.state} login={this.login} logout={this.logout}/>
                </header>
                {this.state.status === "logged-in"
                    ? <LoggedInApp {...this.state} />
                    : <Onboarding/>
                }
            </div>
        );
    }
}

export default App;
