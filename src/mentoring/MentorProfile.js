import React from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
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
                    <Button block><Icon name="fas fa-commenting"/> Chat</Button>
                </Col>
            </Row>
            <Row>
                <Col style={{marginTop: "10px"}}>
                    <Button block><Icon name="fas fa-phone"/> Call</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default MentorProfile;
