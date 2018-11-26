import React, {Component} from 'react';
import {Col, Row} from "react-bootstrap";
import ProgressionTimeline from "./ProgressionTimeline";
import Milestone from "./Milestone";
import MentorTile from "./MentorTile";
import ProgressChart from "../journey/ProgressChart";

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
                completed: "12 June '18",
                ready: true,
                typeformID: "MDHUre"
            },{
                id: 2,
                title: "Personal Statement",
                description: "Preparing your personal statement involves bla bla",
                progress: 30,
                date: "September",
                completed: false,
                ready: true,
                typeformID: "MDHUre"

            },{
                id: 3,
                title: "Oxbridge deadline",
                description: "The deadline for Obridge bla bla bla",
                progress: 50,
                date: "15 October",
                completed: false,
                ready: false,
                typeformID: "MDHUre"

            },{
                id: 4,
                title: "Interviews",
                description: "Preparing your interviews bla bla",
                progress: 70,
                date: "December",
                completed: false,
                ready: false,
                typeformID: "MDHUre"
            },{
                id: 5,
                title: "Offer",
                description: "Receiving the offer bla bla bla",
                progress: 90,
                date: "January",
                completed: false,
                ready: false,
                typeformID: "MDHUre"
            },{
                id: 6,
                title: "Ready, start!",
                description: "Ready to start bla bla",
                progress: 100,
                date: "September",
                completed: false,
                ready: false,
                typeformID: "MDHUre"
            }]
        }

    }

    render() {
        return (
            <Row>
                <Col md={2}>
                    <ProgressionTimeline milestones={this.state.milestones} active={this.state.active} changeSection={(m) => this.setState({active: m.id})}/>
                </Col>
                <Col md={7}>
                    <Milestone milestone={this.state.milestones.filter(m => m.id === this.state.active)[0]}/>
                </Col>
                <Col md={3}>
                    <MentorTile mentor={this.props.mentor}/>
                    <Row style={{marginTop: "50px"}}>
                        <ProgressChart completed={this.state.milestones.filter(m => m.completed).length}
                                       missing={this.state.milestones.filter(m => !m.completed).length}/>
                    </Row>
                    <Row>
                        <h5 style={{transform: "translateX(25%)", fontWeight: "500", textAlign: "center"}}>
                            You're on track to your <br/>dream University! 💪
                        </h5>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default Mentoring;
