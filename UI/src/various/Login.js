import React, {Component} from 'react';
import {Button, Col, Container, Form, Row, Alert, Image} from 'react-bootstrap'
import Loader from 'react-loader-spinner'

const api = require("../api");
const queryString = require('query-string');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            authCode: "",
            userId: "",
            showAuthCodeBox: false,
            alert: null,
            loading: false
        };
        this.login = this.login.bind(this);
    };

    componentDidMount() {
        this.checkIfLoginToken(this.props);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.checkIfLoginToken(nextProps);
    }

    checkIfLoginToken(props) {
        const qs = queryString.parse(window.location.search);
        if (qs.token && qs.id) this.setState({
            loading: true,
            showAuthCodeBox: true,
            authCode: qs.token,
            userId: qs.id
        }, () => {
            setTimeout(() => props.validate(this.state.userId, this.state.authCode), 1500)
        })
    }

    login(event) {
        event.preventDefault();
        const {email, authCode, showAuthCodeBox} = this.state;
        if (showAuthCodeBox) {
            this.setState({loading: true}, () => {
                setTimeout(() => this.props.validate(this.state.userId, this.state.authCode), 1500);
            });
        } else {
            this.setState({loading: true}, () => api.get(`/auth/login?email=${email}`)
                .then(r => {
                    let alert;
                    if (r.success) {
                        alert = <Alert variant="success">An email with the sign-in link has been sent to {email}</Alert>
                        window.localStorage.setItem("email", email)
                    } else alert = <Alert variant="danger">{r.error}</Alert>;
                    this.setState({loading: false, alert: alert, showAuthCodeBox: r.success})
                }))

        }
    }

    //TODO Add field for manual code input

    render() {
        return (
            <Container fluid>
                <Container className="onboarding">
                    <Row className="justify-content-md-center">
                        <Col md={6} style={{paddingTop: "130px"}}>
                            <h2>Sign In</h2>
                            <h6>We'll send you an email with a login code, just click on the link!</h6>
                            <Form onSubmit={(event) => this.login(event)}>
                                {this.state.showAuthCodeBox ? <div>
                                        <Form.Label>User ID</Form.Label>
                                        <Form.Control placeholder="User ID" value={this.state.userId}
                                                      onChange={e => this.setState({userId: e.target.value})}/>
                                    </div>
                                    : <div>
                                        <Form.Label>Your email address</Form.Label>
                                        <Form.Control placeholder="you@example.com" value={this.state.email}
                                                      onChange={e => this.setState({email: e.target.value})}/>
                                    </div>}
                                {this.state.showAuthCodeBox ? <div>
                                        <Form.Label>Auth Code</Form.Label>
                                        <Form.Control placeholder="Auth code" value={this.state.authCode}
                                                      onChange={e => this.setState({authCode: e.target.value})}/>
                                    </div>
                                    : null}
                                <br/>
                                <Button type="submit" variant="success" block disabled={this.state.loading}>
                                    <Row className="justify-content-md-center">

                                        {this.state.loading ? <Col md={4}>
                                            <Loader type="Oval" color="#ffffff" width="20" height="20"/> </Col> : null}

                                        <Col md={8}>
                                            {this.state.showAuthCodeBox ? <span>Login</span> :
                                                <span>Send me a magic link! <Image
                                                    src={"https://cdn3.iconfinder.com/data/icons/object-emoji/50/MagicWand-512.png"}
                                                    width="30"/></span>}
                                        </Col>
                                    </Row>
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
};

export default Login;
