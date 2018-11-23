import React from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {Icon} from "react-fa";

const MentorTile = (props) => {
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
                    <LinkContainer to={`/mentor/${props.mentor.id}`} style={{cursor: "pointer"}}>
                        <img alt="mentor profile pic" width="150px" src={props.mentor.pictureUrl} />
                    </LinkContainer>
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
                    <LinkContainer to="/message">
                        <Button block><Icon name="fas fa-commenting"/> Message</Button>
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

export default MentorTile;
