import React, {Component} from 'react';
import {Button, Col, Container, Form, Row, Alert, Image} from 'react-bootstrap'
import Loader from 'react-loader-spinner'
import * as EmailValidator from 'email-validator';
import * as api from "../api";
import * as queryString from 'query-string';
import * as _ from 'lodash';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            alert: null,
            loading: false
        };
    };

    componentDidMount() {
        this.checkIfToken();

    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.checkIfToken();
    }

    checkIfToken() {
        const qs = queryString.parse(window.location.search);
        if (qs.token) window.localStorage.setItem("token", qs.token);
        if(window.localStorage.getItem("token")) this.login()

    }

    login(){
        api.get("/api/users/profile").then(r => {
            if(r.success) this.setState({user: r.payload}, () => {
                const redirectTo = _.get(this.props, "location.state.from") || "/";
                this.props.history.push({redirectTo, search: ''});
            });
            else {
                window.localStorage.removeItem("token");
                window.localStorage.removeItem("id");
                this.setState({user: undefined})
            }
        })

    }

    requestLoginToken(event) {
        event.preventDefault();
        const {email} = this.state;
        if (!EmailValidator.validate(email)) {
            this.setState({alert: <Alert variant="danger">Invalid email address</Alert>});
            return;
        }
        this.setState({loading: true}, () => api.get(`/auth/login?email=${email}`)
            .then(r => {
                let alert;
                if (r.success) {
                    alert = <Alert variant="success">An email with the sign-in link has been sent to {email}</Alert>;
                    window.localStorage.setItem("email", email)
                } else alert = <Alert variant="danger">There was a problem logging you in, sorry</Alert>;
                this.setState({loading: false, alert: alert})
            }))
    }

    //TODO Consider Formik to improve

    render() {
        return (
            <Container fluid>
                <Container className="onboarding">
                    <Row className="justify-content-md-center">
                        <Col md={6} style={{paddingTop: "130px"}}>
                            <h2>Sign In</h2>
                            <h6>We'll send you an email with a login code, just click on the link!</h6>
                            <Form onSubmit={(event) => this.requestLoginToken(event)}>
                                <Form.Label>Your email address</Form.Label>
                                <Form.Control placeholder="you@example.com" value={this.state.email}
                                              onChange={e => this.setState({email: e.target.value})}/>

                                <br/>
                                <Button type="submit" variant="success" block disabled={this.state.loading}>
                                    {this.state.loading ?
                                        <Loader type="Oval" color="#ffffff" width="20" height="20"/> :
                                        <span>Send me a magic link! <Image
                                            src={"https://cdn3.iconfinder.com/data/icons/object-emoji/50/MagicWand-512.png"}
                                            width="30"/></span>}

                                </Button>
                            </Form>
                            <br/>
                            {this.state.alert}
                        </Col>
                    </Row>
                </Container>

            </Container>
        );
    }
}

export default Login;
