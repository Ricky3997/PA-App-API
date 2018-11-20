import React, {Component} from 'react';
import {Col, Row} from "react-bootstrap";
import {ReactTypeformEmbed} from 'react-typeform-embed'

class JourneyModule extends Component {
    render() {

        return (
                <Row>
                    <Col>
                        <ReactTypeformEmbed url={`https://projectaccess.typeform.com/to/MDHUre?mentorfirstname=${"Riccardo"}&uniqueid=${1532907125}&mentoremail=${"riccardo@broggi.co.uk"}&menteefirstname=${"Emil"}`}
                                            style={{"minHeight": "600px"}}/>
                    </Col>
                </Row>
        );
    }
}

export default JourneyModule;
