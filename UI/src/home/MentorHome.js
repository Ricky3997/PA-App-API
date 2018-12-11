import React, {Component} from 'react';
import {Col, Row} from "react-bootstrap";
import ProgressionTimeline from "./ProgressionTimeline";
import Milestone from "./Milestone";
import MentorTile from "./MentorTile";
import ProgressChart from "../journey/ProgressChart";
import NoMentorYet from "./NoMentorYet";
import Container from "react-bootstrap/es/Container";
import Button from "react-bootstrap/es/Button";

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
                    {!this.props.user.onboarded ? <Button onClick={() => this.props.history.push("/onboard")}>Looks like you are not onboarded, go finish</Button> : <span>Mentor Home</span>}
                </Col>
            </Row>
        </Container>
    }
}

export default MentorHome;
