import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import * as _ from "lodash";
import MenteeTile from "./MenteeTile";
import AcceptMenteeBox from "./AcceptMenteeBox";


const MentoringHome = (props) => {

  let toRender;
  if (!props.user.onboarded) {
    toRender = <Button onClick={() => props.history.push("/onboard")}>
      Looks like you are not onboarded, go finish
    </Button>;
  } else if  (props.user.mentorProfile.status === "rejected") { //TODO
    toRender = <div>
      Unfortunately you have been rejected, and this was indicated as the reason:
      <blockquote>
        {props.user.mentorProfile.rejectionReason}
      </blockquote>
    </div>;
  }

  return (
    <div>
      <Row>
        <Col md={9}>
          <p>
            It's always great to see you back with us, and thank you so much for being an amazing human being changing
            the world!
          </p>
        </Col>
      </Row>

      <Row>
        <Col md={9}>
          HOME
        </Col>
        <Col md={3}>
          <Row>
            <h4>Your Mentees <span role="img" aria-labelledby={"angel emoji"}>😇</span></h4>
            {_.get(props, "user.mentorProfile.relationship.length") > 0 ?
              props.user.mentorProfile.relationship.map(r => r.status === "awaitingConfirmation" ?
                <AcceptMenteeBox {...r} /> : <MenteeTile key={r._id} {...r} />) :
              <div>
                <div>{toRender}</div>
              </div>}
          </Row>
          <br/>
          <Row>

          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default MentoringHome;
