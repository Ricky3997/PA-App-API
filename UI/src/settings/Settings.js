import React, {Component} from 'react';
import {Col, Container, Form, Row, Button, Alert, Image} from "react-bootstrap";
import {Icon} from "react-fa";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            emailAddress: '',
            outcome: null,
            validated: false,
            isLoading: false
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.status === "logged-in") this.setState({emailAddress: nextProps.user.emailAddress})
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === true) {
            this.setState({ isLoading: true }, () => {
                this.simulateNetworkRequest().then(() => {
                    this.setState({
                        isLoading: false,
                        outcome: <Alert variant={'success'}>Settings would have been updated successfully</Alert>
                    });
                });
            });
        }

    }

    simulateNetworkRequest() {
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    render() {
        if(this.props.status === "logged-out") return <div>Not logged in</div>
        return (
            <Container>
                <Row>
                    <Col>
                        <h2>
                            Edit Your Profile
                        </h2>
                    </Col>
                </Row>
                <Form
                    noValidate
                    validated={this.state.validated}
                    onSubmit={e => this.handleSubmit(e)}>
                    <Form.Row>
                        <Col md={3}>
                            <h5>Profile picture </h5>
                            <div className="settings-user-image-container" onClick={() => alert("Will do soon!")}>
                                <Image rounded alt="User avatar" src={this.props.user.pictureUrl} className="settings-user-image" />
                                    <div className="hover-user-image-overlay">
                                        <div className="hover-user-image-text">
                                            <Icon name="fas fa-camera"/>
                                            <br />
                                            Change your profile photo
                                        </div>
                                    </div>
                            </div>
                        </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Col md={6}>
                            <Form.Group controlId="emailAddress">
                                <h5>Email Address</h5>
                                <Form.Control type="email" value={this.state.emailAddress} required
                                              onChange={(e) => this.setState({ emailAddress: e.target.value })}/>
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                                <Form.Control.Feedback type="invalid">
                                    Please use a valid email address
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col md={{size: 2, offset: 8}}>
                            <Button variant="secondary" block>
                                Cancel
                            </Button>
                        </Col>
                        <Col md={{size: 2}}>
                            <Button variant="success" block type="submit" disabled={this.state.isLoading}>
                                {this.state.isLoading ? 'Loading…' : 'Save'}
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
                <br />
                <Row>
                    <Col>
                        {this.state.outcome}
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default Settings;
