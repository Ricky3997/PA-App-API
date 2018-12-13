import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import * as api from "../../api";

const queryString = require('query-string');

class Confirm extends Component {
    constructor(props){
        super(props);
        this.state = {
            status: "confirming"
        };
        this.confirm = this.confirm.bind(this);
    };

    componentDidMount() {
        const qs = queryString.parse(window.location.search);
        if(qs.token && qs.id && qs.email) this.confirm(qs.token, qs.id, qs.email)
    }

    confirm(token, id, email){
        api.get(`/auth/confirm?token=${token}&id=${id}&email=${email}&`).then(r => {
            this.setState({status: r.success ? "confirmed" : "error"})
        })
    }

    render() {
        return (
            <Container fluid>
                <Container className="onboarding">
                    <Row className="justify-content-md-center">
                        <Col  md={6} style={{paddingTop: "130px"}}>
                            {this.state.status === "confirming" ?
                            <span>
                                Confirming..
                            </span> : null
                            }
                            {this.state.status === "confirmed" ?
                                <span>
                                Confirmed
                            </span> : <span>
                                    Error
                                </span>
                            }
                        </Col>
                    </Row>
                </Container>

            </Container>
        );
    }
};

export default Confirm;
