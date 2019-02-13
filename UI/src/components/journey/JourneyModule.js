import React from "react";
import { Col, Row } from "react-bootstrap";
import { ReactTypeformEmbed } from "react-typeform-embed";


const JourneyModule = (props) => {
  const milestones = [{
    id: 1,
    title: "Subject choice",
    description: "The choice of a subject bla bla bla",
    progress: 10,
    date: "June/July",
    completed: "12 June '18",
    ready: true,
    typeformID: "MDHUre"
  }, {
    id: 2,
    title: "Personal Statement",
    description: "Preparing your personal statement involves bla bla",
    progress: 30,
    date: "September",
    completed: false,
    ready: true,
    typeformID: "MDHUre"

  }, {
    id: 3,
    title: "Oxbridge deadline",
    description: "The deadline for Obridge bla bla bla",
    progress: 50,
    date: "15 October",
    completed: false,
    ready: false,
    typeformID: "MDHUre"

  }, {
    id: 4,
    title: "Interviews",
    description: "Preparing your interviews bla bla",
    progress: 70,
    date: "December",
    completed: false,
    ready: false,
    typeformID: "MDHUre"
  }, {
    id: 5,
    title: "Offer",
    description: "Receiving the offer bla bla bla",
    progress: 90,
    date: "January",
    completed: false,
    ready: false,
    typeformID: "MDHUre"
  }, {
    id: 6,
    title: "Ready, start!",
    description: "Ready to start bla bla",
    progress: 100,
    date: "September",
    completed: false,
    ready: false,
    typeformID: "MDHUre"
  }];

    const module = milestones.filter(m => m.id === parseInt(props.match.params.id))[0];
    return (
        <Row>
            <Col>
                {(module && module.ready) ? <ReactTypeformEmbed
                    url={`https://projectaccess.typeform.com/to/${module.typeformID}?` +
                    `mentorfirstname=${props.user.firstName}` +
                    `&uniqueid=${1532907125}&` +
                    `mentoremail=${props.user.email}&`+
                    `menteefirstname=${"Emil"}`}
                    style={{"minHeight": "600px"}}/> :
                <div>
                    What you are looking for either doesn't exist or you're not allowed to get to, yet!
                </div>
                }
            </Col>
        </Row>
    );

};


export default JourneyModule;
