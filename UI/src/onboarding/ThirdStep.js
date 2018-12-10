import React from 'react';
import {Badge, Button, Col, Form, Image, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import PALogo from "../pa_key.png";

const ThirdStep = (props) => {
    if (!props.user) return null;
    return <Form>
        {props.user.type === "mentee" ? (<div>
            <Form.Row style={{paddingTop: "80px"}}>
                <Col md={{span: 3, offset: 3}}>
                    <Form.Label>Your current University</Form.Label>
                    <Form.Control value={props.university}
                                  onChange={props.changeUniversity}/>

                </Col>
                <Col md={{span: 3}}>

                    <Form.Label>Your subject of study</Form.Label>
                    <Form.Control value={props.subject}
                                  onChange={props.changeSubject}/>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col md={{span: 3, offset: 3}}>

                    <Form.Label>Degree level</Form.Label>
                    <Form.Control as="select" value={props.level}
                                  onChange={props.changeLevel}>
                        <option>Undergraduate</option>
                        <option>Masters</option>
                        <option>Doctorate</option>
                    </Form.Control>

                </Col>
                <Col md={{span: 3}}>

                    <Form.Label>Area of study</Form.Label>
                    <Form.Control as="select" value={props.area}
                                  onChange={props.changeArea}>
                        <option>Natural Sciences</option>
                        <option>Humanities</option>
                        <option>Social Sciences</option>
                        <option>Engineering</option>
                        <option>Business and Economics</option>
                    </Form.Control>
                </Col>
            </Form.Row>
            <br/>
        </div>) : (
            <div>
                <Form.Row style={{paddingTop: "80px"}}>
                    <Col md={{span: 3, offset: 3}}>
                        <Form.Label>Your current University</Form.Label>
                        <Form.Control value={props.university}
                                      onChange={props.changeUniversity}/>

                    </Col>
                    <Col md={{span: 3}}>

                        <Form.Label>Your subject of study</Form.Label>
                        <Form.Control value={props.subject}
                                      onChange={props.changeSubject}/>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col md={{span: 3, offset: 3}}>

                        <Form.Label>Degree level</Form.Label>
                        <Form.Control as="select" value={props.level}
                                      onChange={props.changeLevel}>
                            <option>Undergraduate</option>
                            <option>Masters</option>
                            <option>Doctorate</option>
                        </Form.Control>

                    </Col>
                    <Col md={{span: 3}}>

                        {/*TODO value not being used to control input, change*/}
                        <Form.Label>Area of study</Form.Label>
                        <Form.Control as="select" value={props.area}
                                      onChange={props.changeArea}>
                            <option>Natural Sciences</option>
                            <option>Humanities</option>
                            <option>Social Sciences</option>
                            <option>Engineering</option>
                            <option>Business and Economics</option>
                        </Form.Control>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col md={{span: 3, offset: 3}}>

                        <Form.Label>Current year of degree</Form.Label>
                        <Form.Control as="select" value={props.year}
                                      onChange={props.changeYear}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6+</option>
                        </Form.Control>

                    </Col>
                </Form.Row>
                <br/>
            </div>)}

        <Form.Row>
            <Col md={{span: 3, offset: 3}}>
                <Button block onClick={() => props.changeStep(2)}>
                    Previous
                </Button>
            </Col>
            <Col md={{span: 3}}>
                <Button variant="success" block onClick={() => props.changeStep(4)}>
                    Next
                </Button>
            </Col>
        </Form.Row>
    </Form>
};

export default ThirdStep;
