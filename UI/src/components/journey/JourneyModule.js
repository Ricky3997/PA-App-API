import React from "react";
import { Col, Row } from "react-bootstrap";
// import { ReactTypeformEmbed } from "react-typeform-embed";


const JourneyModule = (props) => {
    const module = props.milestones.filter(m => m.id === parseInt(props.match.params.id))[0];
    return (
        <Row>
            <Col>
                {/*{(module && module.ready) ? <ReactTypeformEmbed*/}
                    {/*url={`https://projectaccess.typeform.com/to/${module.typeformID}?` +*/}
                    {/*`mentorfirstname=${props.user.firstName}` +*/}
                    {/*`&uniqueid=${1532907125}&` +*/}
                    {/*`mentoremail=${props.user.email}&`+*/}
                    {/*`menteefirstname=${"Emil"}`}*/}
                    {/*style={{"minHeight": "600px"}}/> :*/}
                {/*<div>*/}
                    {/*What you are looking for either doesn't exist or you're not allowed to get to, yet!*/}
                {/*</div>*/}
                {/*}*/}
            </Col>
        </Row>
    );

};


export default JourneyModule;
