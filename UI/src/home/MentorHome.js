import React, {Component} from 'react';
import {Col, Row} from "react-bootstrap";
import ProgressionTimeline from "./ProgressionTimeline";
import Milestone from "./Milestone";
import MentorTile from "./MentorTile";
import ProgressChart from "../journey/ProgressChart";
import NoMentorYet from "./NoMentorYet";
import Container from "react-bootstrap/es/Container";

class MentorHome extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {
        return <Container fluid>
            <Row style={{marginTop: "10px"}}>
                <Col>
                    Mentor Home
                </Col>
            </Row>
        </Container>
    }
}

export default MentorHome;
