import React from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {Icon} from "react-fa";

const MentorProfile = (props) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h4>
                        Your Mentor <span role="img" aria-label="hands raised in celebration">🙌</span>
                    </h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <img alt="mentor profile pic" width="150px" src={props.mentor.pictureUrl} />
                </Col>
                <Col>
                    <Row>
                        {props.mentor.firstName}
                    </Row>
                    <Row>
                        {props.mentor.course}
                    </Row>
                    <Row>
                        {props.mentor.university}
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col style={{marginTop: "10px"}}>
                    <LinkContainer to="/chat">
                        <Button block><Icon name="fas fa-commenting"/> Chat</Button>
                    </LinkContainer>
                </Col>
            </Row>
            <Row>
                <Col style={{marginTop: "10px"}}>
                    <LinkContainer to="/call">
                        <Button block><Icon name="fas fa-phone"/> Call</Button>
                    </LinkContainer>
                </Col>
            </Row>
        </Container>
    );
};

export default MentorProfile;
