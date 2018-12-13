import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { Icon } from "react-fa";

const ModuleBox = (props) => {
        return (
            <Container className="journey-module-box" style={{backgroundColor: props.milestone.completed ? "#4f84bc" : "#d64f29"}}>
                <Row>
                    <Col md={7}>
                        <h5> Module {props.milestone.id} | {props.milestone.title}
                        </h5>
                        <p>
                            {props.milestone.description}
                        </p>
                    </Col>
                    <Col md={5}>
                        {props.milestone.ready ?
                            <Container>
                                <b>
                                    {props.milestone.completed ? `✅ Completed on ${props.milestone.completed} 🎉` : "Take the next step! 🚀"}
                                </b>
                                <LinkContainer to={`/journey/${props.milestone.id}`} disabled={!props.milestone.ready}
                                               className="pa_orange_link">
                                    <Button block style={{"backgroundColor": "#eb9d26"}}>
                                        {props.milestone.completed ? "Take again!" : "Start now!"}
                                    </Button>
                                </LinkContainer>
                            </Container> :
                            <OverlayTrigger placement="bottom" overlay={
                                <Tooltip placement="bottoom" className="in">
                                    <span role="img" aria-label="rocket">🖐</span>
                                    Not too fast, you have to complete the previous one first!
                                    <span role="img" aria-label="rocket">😉</span>
                                </Tooltip>}>
                                <Icon name="fas fa-lock" style={{fontSize: "50px", color: "#eb9d26"}}/>
                            </OverlayTrigger>
                        }

                    </Col>
                </Row>
            </Container>
        );
};

export default ModuleBox;
