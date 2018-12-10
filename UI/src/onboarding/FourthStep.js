import React from 'react';
import {Badge, Button, Col, Form, Image, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import PALogo from "../pa_key.png";

const FourthStep = (props) => {
    if (!props.user) return null;
    return <div>

        <Row style={{paddingTop: "80px"}}>
            <Col md={{span: 6, offset: 3}}>
                <p>
                    Fantastic {props.user.firstName}, thanks for completing this!! Let's recap all your information to make sure it's right and then you'll be ready to go
                </p>
            </Col>
        </Row>



        <Row>
            <Col md={{span: 4, offset: 2}}>
                <Badge variant="info">{"You are"}</Badge>
                <Form.Label>{`${props.gender} and ${props.firstGenStudent ? "First Generation" : "Not First Generation"}`} </Form.Label>
            </Col>

            <Col md={4}>
                <Badge variant="info">{"You are from"}</Badge>
                <Form.Label>{`${props.city}, ${props.country}`} </Form.Label>
            </Col>
        </Row>
        <Row>
            <Col md={{span: 4, offset: 2}}>
                <Badge variant="info">{"Currently studying"}</Badge>
                <Form.Label>{`${props.subject} at ${props.currentUniversity}`}</Form.Label>
            </Col>

            <Col md={4}>
                <Badge variant="info">{"In Year"}</Badge>
                <Form.Label>{`${props.year} of your ${props.level} degree`} </Form.Label>
            </Col>
        </Row>

        <Row>
            <Col md={{span: 4, offset: 2}}>
                <Button block onClick={() => props.changeStep(3)}>
                    Previous
                </Button>
            </Col>
            <Col md={{span: 4}}>
                <Button variant="success" block disabled={props.loading}
                        onClick={() => {props.user.type === "mentee" ? props.registerMentee() : props.registerMentor()}}>
                    Looks good, let's go!
                </Button>
            </Col>
        </Row>
    </div>
};

export default FourthStep;
