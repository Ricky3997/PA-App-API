import React from 'react';
import {Badge, Button, Col, Form, Image, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import PALogo from "../../assets/pa_key.png";

const FirstStep = (props) => {
        return (
            <Row>
                <Col md={7} style={{paddingTop: "160px"}}>
                    <Image width="100px" src={PALogo}/>
                    <h1>
                        Where passion and potential define your future.
                    </h1>
                    <p>At Project Access we help disadvantaged students reach a Top University</p>
                </Col>
                <Col md={{size: 2, offset: 1}} style={{paddingTop: "130px"}}>
                    <Form onSubmit={props.register}>

                        <Form.Label>You are a</Form.Label>
                        <Form.Control as="select" value={props.type}
                                      onChange={props.changeType}>
                            <option>High School Student</option>
                            <option>Current University Student</option>
                        </Form.Control>

                        <Form.Label>Your First Name</Form.Label>
                        <Form.Control placeholder="First Name" value={props.firstName}
                                      onChange={props.changeFirstName}/>

                        <Form.Label>
                            <span>Your <b>{props.type === "High School Student" ? "" : "University"}</b> Email Address  </span>
                            {props.type === "High School Student" ? null :
                                <OverlayTrigger placement="bottom"
                                                overlay={<Tooltip placement="bottoom" className="in">We need
                                                    this to verify the university you attend!</Tooltip>}>
                                    <Badge pill variant="info">
                                        Why?
                                    </Badge>
                                </OverlayTrigger>
                            }

                        </Form.Label>
                        <Form.Control type="email"
                                      placeholder={props.type === "High School Student" ? "you@example.com" : "you@university.edu"}
                                      value={props.email}
                                      onChange={props.changeEmail}/>

                        <br/>
                        <Button type="submit" variant="success" block disabled={props.loading}>
                            {props.type === "High School Student" ? "Find your mentor!" : "Help a mentee!"}
                        </Button>

                    </Form>
                </Col>
            </Row>
        );
};

export default FirstStep;
