import React, {Component} from 'react';
import {Button, Col, Container, Form, Row, Alert} from 'react-bootstrap'
const api = require("../api");
const queryString = require('query-string');

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            alert: null
        };
        this.login = this.login.bind(this);
    };

    componentDidMount() {
        this.checkIfLoginToken(this.props);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.checkIfLoginToken(nextProps);
    }

    checkIfLoginToken(props){
        const qs =  queryString.parse(window.location.search);
        if(qs.token && qs.id) props.validate(qs.id, qs.token);
    }

    login(event){
        event.preventDefault();
        const {email} = this.state;
        api.get(`/auth/login?email=${email}`)
            .then(r => {
                let alert;
                if(r.success){
                    alert = <Alert variant="success">An email with the sign-in link has been sent to {email}</Alert>
                    window.localStorage.setItem("email", email)
                } else alert = <Alert variant="danger">{r.error}</Alert>;
                this.setState({alert: alert})
            })
    }

    render() {
        return (
            <Container fluid>
                <Container className="onboarding">
                    <Row className="justify-content-md-center">
                        <Col  md={6} style={{paddingTop: "130px"}}>
                            <h2>
                                Sign In
                            </h2>
                            <Form onSubmit={(event) => this.login(event)}>

                                <Form.Label>Your email address</Form.Label>
                                <Form.Control placeholder="you@example.com" value={this.state.email} onChange={e => this.setState({email: e.target.value})} />

                                <br/>
                                <Button type="submit" variant="success" block>
                                    Login!
                                </Button>
                            </Form>
                            <br />
                            {this.state.alert}
                        </Col>
                    </Row>
                </Container>

            </Container>
        );
    }
};

export default Login;
