import React from 'react';
import {Col, Row} from "react-bootstrap";
import {ReactTypeformEmbed} from 'react-typeform-embed'


const JourneyModule = (props) => {
    return (
        <Row>
            <Col>
                {props.module ? <ReactTypeformEmbed
                    url={`https://projectaccess.typeform.com/to/${props.module.typeformID}?` +
                    `mentorfirstname=${props.user.firstName}` +
                    `&uniqueid=${1532907125}&` +
                    `mentoremail=${props.user.emailAddress}&`+
                    `menteefirstname=${"Emil"}`}
                    style={{"minHeight": "600px"}}/> :
                <div>
                    Not found
                </div>
                }
            </Col>
        </Row>
    );

};


export default JourneyModule;
