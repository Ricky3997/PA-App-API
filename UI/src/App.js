import React, {Component} from 'react';
import './App.css'
import HeaderNavbar from "./various/HeaderNavbar";
import LoggedInApp from "./various/LoggedInApp";
import Onboarding from "./various/Onboarding";
import Login from "./various/Login";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: "onboarding"
        };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.onboard = this.onboard.bind(this);
    }

    login(){
        this.setState({status: "login"});
    }

    onboard(){
        this.setState({status: "onboarding"});
    }

    logout(){
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
