import React, {Component} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import ProgressionTimeline from "./ProgressionTimeline";
import Milestone from "./Milestone";

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
                date: "June/July"
            },{
                id: 2,
                title: "Personal Statement",
                description: "Preparing your personal statement involves bla bla",
                progress: 30,
                date: "September"
            },{
                id: 3,
                title: "Oxbridge deadline",
                description: "The deadline for Obridge bla bla bla",
                progress: 50,
                date: "15 October"
            },{
                id: 4,
                title: "Interviews",
                description: "Preparing your interviews bla bla",
                progress: 70,
                date: "December"

            },{
                id: 5,
                title: "Offer",
                description: "Receiving the offer bla bla bla",
                progress: 90,
                date: "January"
            },{
                id: 6,
                title: "Ready, start!",
                description: "Ready to start bla bla",
                progress: 100,
                date: "September"

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
                        My Mentor
                    </Col>

                </Row>
            </Container>
        );
    }
}

export default Mentoring;
