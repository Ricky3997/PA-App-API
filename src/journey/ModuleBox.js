import React from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Button, Col, Container, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {Icon} from "react-fa";

const ModuleBox = (props) => {
        return (
            <Container className="journey-module-box" style={{backgroundColor: props.module.completed ? "#4f84bc" : "#d64f29"}}>
                <Row>
                    <Col>
                        <h5> Module {props.module.id} | {props.module.title}
                        </h5>
                    </Col>
                </Row>
                <Row>
                    <Col md={9}>
                        <p>
                            {props.module.description}
                        </p>
                    </Col>
                    <Col md={3}>
                        {props.module.ready ?
                            <LinkContainer to={`/journey/${props.module.id}`} disabled={!props.module.ready}
                                           className="pa_orange_link">
                                <Button style={{"backgroundColor": "#eb9d26"}}>
                                    {props.module.completed ? "Take again!" : "Start now!"}
                                </Button>
                            </LinkContainer> :
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
