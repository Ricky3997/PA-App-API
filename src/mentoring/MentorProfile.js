import React from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {Icon} from "react-fa";

const MentorProfile = (props) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h4>
                        Your Mentor 🙌
                    </h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <img width="150px" src={props.mentor.pictureUrl} />
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
                    <Button outline bsStyle="success" block><Icon name="fas fa-commenting"/> Chat</Button>
                </Col>
            </Row>
            <Row>
                <Col style={{marginTop: "10px"}}>
                    <Button color="primary" block><Icon name="fas fa-phone"/> Call</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default MentorProfile;
