import React, {Component} from 'react';
import {Breadcrumb, Col, Container, Row} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {ReactTypeformEmbed} from 'react-typeform-embed'

class JourneyModule extends Component {
    render() {

        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Breadcrumb>
                            <LinkContainer to="/journey">
                                <Breadcrumb.Item>Your Journey</Breadcrumb.Item>
                            </LinkContainer>
                            <Breadcrumb.Item active>Module {this.props.match.params.id}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ReactTypeformEmbed url={`https://projectaccess.typeform.com/to/MDHUre?mentorfirstname=${"Riccardo"}&uniqueid=${1532907125}&mentoremail=${"riccardo@broggi.co.uk"}&menteefirstname=${"Emil"}`}
                                            style={{"minHeight": "600px"}}/>
                    </Col>
                </Row>

            </Container>
        );
    }
}

export default JourneyModule;
