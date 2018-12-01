import React, {Component} from 'react';
import {Badge, Button, Col, Container, Form, Image, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import PALogo from '../pa_key.png'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const api = require("../api");


class Onboarding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            email: "",
            type: "High School Student",
            loading: false
        };
    }

    componentDidMount() {
        this.redirectIfLoggedIn(this.props);
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.redirectIfLoggedIn(nextProps)
    }

    redirectIfLoggedIn(props){
        if(props.user) props.history.push("/");
    }

    validateEmail(email, type){
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(type === "Current University Student") return re.test(email); //TODO More spcific ac.uk / edu
        else return re.test(String(email.toLowerCase()));
    }


    onboardNewUser(event) {
        event.preventDefault();
        event.stopPropagation();
        const {email, type, firstName} = this.state;
        if(this.validateEmail(email, type)) {
            this.setState({loading: true});
            api.post("/auth/register", {
                email: email,
                firstName: firstName,
                type: type === "High School Student" ? "mentee" : "mentor"
            })
                .then(r => {
                    this.setState({loading: false});
                    r.success ? toast.success("Registered") : toast.error("Error")
                });
        }
        else {
            toast.error("Invalid email address");

        }
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
                                    <span>Your <b>{this.state.type === "High School Student" ? "" : "Current University Student"}</b> Email Address  </span>
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
                                <Form.Control type="email"
                                    placeholder={this.state.type === "High School Student" ? "you@example.com" : "you@university.edu"}
                                    value={this.state.email}
                                    onChange={e => this.setState({email: e.target.value})}/>

                                <br/>
                                <Button type="submit" variant="success" block disabled={this.state.loading}>
                                    {this.state.type === "High School Student" ? "Find your mentor!" : "Help a mentee!"}
                                </Button>

                            </Form>
                        </Col>
                    </Row>
                </Container>
                <ToastContainer />
            </Container>
        );
    }
};

export default Onboarding;
