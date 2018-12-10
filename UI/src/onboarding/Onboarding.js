import React, {Component} from 'react';
import {Container, Alert} from "react-bootstrap";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import queryString from "query-string";
import FirstStep from "./FirstStep";
import * as EmailValidator from 'email-validator';
import * as api from "../api";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import FourthStep from "./FourthStep";


class Onboarding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            email: "",
            type: "High School Student",
            loading: false,
            currentUniversity: "",
            subject: "",
            level: "Undergraduate",
            country: "",
            firstGenStudent: "Yes",
            city: "",
            gender: "Male",
            year: 1,
            area: "Natural Sciences",
            step: 1,
            alert: null
        };
        this.registerMentor = this.registerMentor.bind(this);
    }

    componentDidMount() {
        this.redirectIfLoggedIn(this.props);
        this.detectTypeFromUrl(this.props);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.redirectIfLoggedIn(nextProps);
        this.detectTypeFromUrl(nextProps);
    }

    redirectIfLoggedIn(props){
        if(props.user) {
            if(props.user.onboarded) props.history.push("/");
            else this.setState({step: 2})
        }
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
                        this.setState({step: 2, alert: null});
                        window.localStorage.setItem("token", r.payload.token);
                        window.localStorage.setItem("id", r.payload.id);
                        this.props.setLoggedIn(r.payload.user)

                    } else{
                        this.setState({alert: <Alert variant="danger">Error</Alert>});
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

    registerMentor(){
        const data = {
            university: this.state.currentUniversity,
            subject:  this.state.subject,
            level: this.state.level,
            country: this.state.country,
            firstGenStudent:  this.state.firstGenStudent === "Yes",
            city: this.state.city,
            gender: this.state.gender,
            year:  this.state.year,
            area:  this.state.area
        };
        this.setState({loading: true}, () => {
            api.post("/api/mentors/registerNew", data).then(r => {
                if(r.success){
                    this.setState({loading: false});
                    let editedUser = this.props.user;
                    editedUser.onboarded = true;
                    editedUser.mentorProfile = data;
                    this.props.editUserDetails(editedUser);
                    this.props.history.push("/");
                } else {
                    this.setState({loading: false});
                    alert("error")
                }
            })
        })

    }

    render() {
        let step;
        switch(this.state.step){
            case 1:
                step = <FirstStep changeType={e => this.setState({type: e.target.value})}
                                  type={this.state.type} firstName={this.state.firstName} email={this.state.email}
                                  changeEmail={e => this.setState({email: e.target.value})}
                                  changeFirstName={e => this.setState({firstName: e.target.value})}
                                  changeStep={(step) => this.setState({step: step})}
                                  register={(event) => this.onboardNewUser(event)} loading={this.state.loading}
                />;
                break;
            case 2:
                step = <SecondStep user={this.props.user} country={this.state.country} city={this.state.city}
                                   changeCountry={(event) => this.setState({country: event.target.value})}
                                   changeCity={(event) => this.setState({city: event.target.value})}
                                   changeStep={(step) => this.setState({step: step})}
                                   changeFirstGenStudent={(event) => this.setState({firstGenStudent: event.target.value})}
                                   changeGender={(event) => this.setState({gender: event.target.value})} gender={this.state.gender}


                />;
                break;
            case 3:
                step = <ThirdStep user={this.props.user} changeUniversity={e => this.setState({currentUniversity: e.target.value})}
                                  currentUniversity={this.state.currentUniversity}
                                  subject={this.state.subject}  changeSubject={e => this.setState({subject: e.target.value})}
                                  level={this.state.level}  changeLevel={e => this.setState({level: e.target.value})}
                                  area={this.state.area}  changeArea={e => this.setState({area: e.target.value})}
                                  year={this.state.year}  changeYear={e => this.setState({year: e.target.value})}
                                  changeStep={(step) => this.setState({step: step})}
                />;
                break;
            case 4:
                step = <FourthStep user={this.props.user} {...this.state} changeStep={(step) => this.setState({step: step})}
                                   registerMentor={this.registerMentor}
                />;
                break;
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
}

export default Onboarding;
