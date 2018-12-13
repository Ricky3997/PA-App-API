import React, {Component} from 'react';
import {Container, Alert} from "react-bootstrap";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import queryString from "query-string";
import RegisterNewUser from "./RegisterNewUser";
import * as EmailValidator from 'email-validator';
import * as api from "../../api";
import MentorOnboarding from "./MentorOnboarding";
import ThirdStep from "./ThirdStep";
import FourthStep from "./FourthStep";
import MenteeOnboarding from "./MenteeOnboarding";


class Onboarding extends Component {

    // detectTypeFromUrl(props){
    //     //TODO Again
    //     const qs = queryString.parse(window.location.search);
    //     if(qs.type) {
    //         let type;
    //         if(qs.type === "mentee") type = "High School Student";
    //         if(qs.type === "mentor") type = "Current University Student";
    //         if(type) this.setState({type: type})
    //     }
    // }
    //

    //
    // registerMentor(){
    //     const data = {
    //         university: this.state.university,
    //         subject:  this.state.subject,
    //         level: this.state.level,
    //         country: this.state.country,
    //         firstGenStudent:  this.state.firstGenStudent === "Yes",
    //         city: this.state.city,
    //         gender: this.state.gender,
    //         year:  parseInt(this.state.year),
    //         area:  this.state.area
    //     };
    //     this.setState({loading: true}, () => {
    //         api.post("/api/mentors/registerNew", data).then(r => {
    //             if(r.success){
    //                 this.setState({loading: false});
    //                 let editedUser = this.props.user;
    //                 editedUser.onboarded = true;
    //                 editedUser.mentorProfile = data;
    //                 this.props.setUser(editedUser);
    //                 this.props.history.push("/");
    //             } else {
    //                 this.setState({loading: false});
    //                 alert("error")
    //             }
    //         })
    //     })
    //
    // }

    render() {

        const {changeStage, updateUser, onboarding, user} = this.props;

        let step;
        if(onboarding.step === 1) step = <RegisterNewUser user={user} updateUser={updateUser} changeStage={changeStage} />;
        else if(user.type === "mentor") step = <MentorOnboarding user={user} onboarding={onboarding} changeStage={changeStage}/>;
        else if(user.type === "mentee") step = <MenteeOnboarding />;

        return (
            <Container fluid>
                <Container className="onboarding">
                    {step}
                </Container>
                <ToastContainer />
            </Container>
        );
    }
}

export default Onboarding;
