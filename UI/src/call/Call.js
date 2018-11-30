import React from 'react';
import {Col, Row} from "react-bootstrap";
import {ReactTypeformEmbed} from "react-typeform-embed";

const Call = (props) => {
    //TODO Run with HTTPS=true npm start for cross-origin media access
    const typeformID = "MDHUre";
    return (
        <Row>
            <Col md={8}>
                <iframe title="AppearIn Call" allow="microphone; camera" src={"https://appear.in/riccardolucabroggi" } width={"900px"} height={"600px"}/>
            </Col>
            <Col md={4} style={{backdropColor: "red"}}>
                <Row>
                <ReactTypeformEmbed
                    url={`https://projectaccess.typeform.com/to/${typeformID}?` +
                    `mentorfirstname=${props.user.firstName}` +
                    `&uniqueid=${1532907125}&` +
                    `mentoremail=${props.user.emailAddress}&`+
                    `menteefirstname=${"Emil"}`}
                    style={{"minHeight": "600px"}}/>
                </Row>
            </Col>


        </Row>
    );
};

export default Call;
