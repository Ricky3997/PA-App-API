import React, {Component} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import ProgressionTimeline from "./ProgressionTimeline";
import Milestone from "./Milestone";
import MentorProfile from "./MentorProfile";

class Mentoring extends Component {
    constructor(props){
        super(props);
        this.state = {
            active: 2,
            milestones: [{
                id: 1,
                title: "Subject choice",
                description: "The choice of a subject bla bla bla",
                progress: 10,
                date: "June/July",
                module: {
                    id: 1,
                    title: "Choosing your subject",
                    description: "The Personal Statement is an essay you write to describe yourself and your achievements.",
                    completed: true,
                    ready: true,
                    typeformID: "MDHUre"
                }
            },{
                id: 2,
                title: "Personal Statement",
                description: "Preparing your personal statement involves bla bla",
                progress: 30,
                date: "September",
                module: {
                    id: 2,
                    title: "Writing your Personal Statetement",
                    description: "The Personal Statement is an essay you write to describe yourself and your achievements.",
                    completed: false,
                    ready: true,
                    typeformID: "MDHUre"
                }
            },{
                id: 3,
                title: "Oxbridge deadline",
                description: "The deadline for Obridge bla bla bla",
                progress: 50,
                date: "15 October",
                module: {
                    id: 3,
                    title: "Oxbridge Deadline",
                    description: "All you need to know about the Oxbridge early deadline",
                    completed: false,
                    ready: false,
                    typeformID: "MDHUre"
                }
            },{
                id: 4,
                title: "Interviews",
                description: "Preparing your interviews bla bla",
                progress: 70,
                date: "December",
                module: {
                    id: 4,
                    title: "Preparing your interview",
                    description: "Preparing for your interview can be stressful",
                    completed: false,
                    ready: false,
                    typeformID: "MDHUre"
                }

            },{
                id: 5,
                title: "Offer",
                description: "Receiving the offer bla bla bla",
                progress: 90,
                date: "January",
                module: {
                    id: 5,
                    title: "Receiving an offer",
                    description: "Receiving an offer..",
                    completed: false,
                    ready: false,
                    typeformID: "MDHUre"
                }
            },{
                id: 6,
                title: "Ready, start!",
                description: "Ready to start bla bla",
                progress: 100,
                date: "September",
                module: {
                    id: 6,
                    title: "Getting ready to move into Uni",
                    description: "Moving in...",
                    completed: false,
                    ready: false,
                    typeformID: "MDHUre"
                }

            }]
        }
    }

    calculateProgress(){
        return this.state.milestones.filter(m => m.id === this.state.active)[0].progress
    }

    render() {
        return (
            <Container fluid >
                <Row>
                    <Col>
                        <h3>
                            Welcome to your Mentoring, {this.props.user.firstName}
                        </h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        <ProgressionTimeline milestones={this.state.milestones} progress={this.calculateProgress()} changeSection={(m) => {
                            console.log(m)
                            this.setState({active: m.id})
                        }}/>
                    </Col>
                    <Col md={7}>
                        <Milestone milestone={this.state.milestones.filter(m => m.id === this.state.active)[0]}/>
                    </Col>
                    <Col md={3}>
                        <MentorProfile mentor={this.props.mentor}/>
                    </Col>

                </Row>
            </Container>
        );
    }
}

export default Mentoring;
