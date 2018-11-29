import React, {Component} from 'react';
import {Badge, Button, Col, Container, Form, Image, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import PALogo from '../pa_key.png'
const api = require("../api");

class Onboarding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            emailAddress: "",
            type: "High School Student"
        };
    }


    onboardNewUser(event) {
        event.preventDefault();
        event.stopPropagation();
        //TODO Verify UNI address filter
        api.post("/auth/register", {
                email: this.state.emailAddress,
                firstName: this.state.firstName,
                type: this.state.type === "High School Student" ? "mentee" : "mentor"
            })
            .then(r => alert(r.result))
    }

    render() {
        return (
            <Container fluid>
                <Container className="onboarding">
                    <Row>
                        <Col md={7} style={{paddingTop: "160px"}}>
                            <Image width="100px" src={PALogo}/>
                            <h1>
                                Where passion and potential define your future.
                            </h1>
                            <p>At Project Access we help disadvantaged students reach a Top University</p>
                        </Col>
                        <Col md={{size: 2, offset: 1}} style={{paddingTop: "130px"}}>
                            <Form onSubmit={(event) => this.onboardNewUser(event)}>

                                <Form.Label>You are a</Form.Label>
                                <Form.Control as="select" value={this.state.type}
                                              onChange={e => this.setState({type: e.target.value})}>
                                    <option>High School Student</option>
                                    <option>Current University Student</option>
                                </Form.Control>

                                <Form.Label>Your First Name</Form.Label>
                                <Form.Control placeholder="First Name" value={this.state.firstName}
                                              onChange={e => this.setState({firstName: e.target.value})}/>

                                <Form.Label>
                                    <span>Your <b>{this.state.type === "High School Student" ? "" : "University"}</b> Email Address  </span>
                                    {this.state.type === "High School Student" ? null :
                                        <OverlayTrigger placement="bottom"
                                                        overlay={<Tooltip placement="bottoom" className="in">We need
                                                            this to verify the university you attend!</Tooltip>}>
                                            <Badge pill variant="info">
                                                Why?
                                            </Badge>
                                        </OverlayTrigger>
                                    }

                                </Form.Label>
                                <Form.Control
                                    placeholder={this.state.type === "High School Student" ? "you@example.com" : "you@university.edu"}
                                    value={this.state.emailAddress}
                                    onChange={e => this.setState({emailAddress: e.target.value})}/>

                                <br/>
                                <Button type="submit" variant="success" block>
                                    {this.state.type === "High School Student" ? "Find your mentor!" : "Help a mentee!"}
                                </Button>

                            </Form>
                        </Col>
                    </Row>
                </Container>

            </Container>
        );
    }
};

export default Onboarding;
