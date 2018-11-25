import React, {Component} from 'react';
import {Col, Row} from "react-bootstrap";
import ProgressionTimeline from "./ProgressionTimeline";
import Milestone from "./Milestone";
import MentorTile from "./MentorTile";
import ProgressChart from "../journey/ProgressChart";

class Mentoring extends Component {

    render() {
        return (
            <Row>
                <Col md={2}>
                    <ProgressionTimeline milestones={this.props.milestones} active={this.props.active} changeSection={this.props.changeSection}/>
                </Col>
                <Col md={7}>
                    <Milestone milestone={this.props.milestones.filter(m => m.id === this.props.active)[0]}/>
                </Col>
                <Col md={3}>
                    <MentorTile mentor={this.props.mentor}/>
                    <Row style={{marginTop: "50px"}}>
                        <ProgressChart completed={this.props.milestones.filter(m => m.completed).length}
                                       missing={this.props.milestones.filter(m => !m.completed).length}/>
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
