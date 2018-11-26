import React, {Component} from 'react';
import './App.css'
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
        //this.login();
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
