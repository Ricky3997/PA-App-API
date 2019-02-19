import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Icon } from "react-fa";

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
                <Col md={3}>
                    <img alt="mentor profile pic" width="150px" src={props.mentor.pictureUrl}/>
                </Col>
                <Col md={7}>
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
                <Col md={2}>
                    <Row style={{marginTop: "10px"}}>
                        <LinkContainer to="/message">
                            <Button block><Icon name="fas fa-commenting"/> Message</Button>
                        </LinkContainer>
                    </Row>
                    <Row style={{marginTop: "10px"}}>
                        <LinkContainer to="/call">
                            <Button block><Icon name="fas fa-phone"/> Call</Button>
                        </LinkContainer>
                    </Row>
                </Col>
            </Row>

        </Container>
    );
};

export default MentorTile;
