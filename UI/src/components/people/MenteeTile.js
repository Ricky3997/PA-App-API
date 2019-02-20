import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Icon } from "react-fa";
import ProfileIcon from "../various/ProfileIcon";

const MenteeTile = (props) => {
    return (
        <Container style={{marginBottom: "10px"}}>
            <Row>
                <Col md={4}>
                    <ProfileIcon pictureUrl={props.mentee.pictureUrl} size={"l"} mentorMode/>
                </Col>
                <Col md={6}>
                    <Row>
                        <h6>
                        {props.mentee.firstName}
                        </h6>
                    </Row>
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <LinkContainer to="/message">
                        <Button block><Icon name="fas fa-commenting"/> Message</Button>
                    </LinkContainer>
                </Col>
                <Col>
                    <LinkContainer to="/call">
                        <Button block><Icon name="fas fa-phone"/> Call</Button>
                    </LinkContainer>
                </Col>
            </Row>

        </Container>
    );
};

export default MenteeTile;
