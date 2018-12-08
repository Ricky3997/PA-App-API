import React, {Component} from 'react';
import {Container, Alert} from "react-bootstrap";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import queryString from "query-string";
import FirstStep from "./FirstStep";
import * as EmailValidator from 'email-validator';
import * as api from "../api";


class Onboarding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            email: "",
            type: "High School Student",
            loading: false,
            step: 1,
            alert: null
        };
    }

    componentDidMount() {
        this.redirectIfLoggedIn(this.props);
        this.detectTypeFromUrl(this.props);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.redirectIfLoggedIn(nextProps)
        this.detectTypeFromUrl(nextProps);
    }

    redirectIfLoggedIn(props){
        if(props.user) props.history.push("/");
    }

    detectTypeFromUrl(props){
        const qs = queryString.parse(window.location.search);
        if(qs.type) {
            let type;
            if(qs.type === "mentee") type = "High School Student";
            if(qs.type === "mentor") type = "Current University Student";
            if(type) this.setState({type: type})
        }
    }

    //TODO More spcific ac.uk / edu


    onboardNewUser(event) {
        event.preventDefault();
        event.stopPropagation();
        const {email, type, firstName} = this.state;
        if(EmailValidator.validate(email)) {
            this.setState({loading: true});
            api.post("/auth/register", {
                email: email,
                firstName: firstName,
                type: type === "High School Student" ? "mentee" : "mentor"
            })
                .then(r => {
                    this.setState({loading: false});
                    if(r.success) {
                        this.setState({step: 2, alert: null})
                    } else{
                        this.setState({alert: <Alert variant="danger">Error</Alert>})
                        setTimeout(() => {
                            this.setState({alert: null})
                        }, 3000)
                    }
                });
        }
        else {
            toast.error("Invalid email address");

        }
    }

    render() {
        let step;
        switch(this.state.step){
            case 2:
                step = <div>Step 2</div>
            case 1:
            default:
                step = <FirstStep changeType={e => this.setState({type: e.target.value})}
                                  type={this.state.type} firstName={this.state.firstName} email={this.state.email}
                                  register={(event) => this.onboardNewUser(event)} loading={this.state.loading}
                                  changeEmail={e => this.setState({email: e.target.value})}
                                  changeFirstName={e => this.setState({firstName: e.target.value})}
                />
        }
        return (
            <Container fluid>
                <Container className="onboarding">
                    {step}
                    <br />
                    {this.state.alert}
                </Container>
                <ToastContainer />
            </Container>
        );
    }
};

export default Onboarding;
