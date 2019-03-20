import React from "react";
import { Button, Col, Image, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import * as _ from "lodash";
import MenteeTile from "./MenteeTile";
import { LinkContainer } from "react-router-bootstrap";
import AcceptMenteeBox from "./AcceptMenteeBox";


const MentoringHome = (props) => {

  let toRender;
  if (!props.user.onboarded) {
    toRender = <Button onClick={() => props.history.push("/onboard")}>
      Looks like you are not onboarded, go finish
    </Button>;
  } else if (props.user.mentorProfile.status === "notYetRequested") {
    toRender = <div>
      <p>To be able to help a mentee, you first need to request approval
      </p>

      {props.user.emailConfirmed ? <Button onClick={() => props.toggleMentorHomeModal()}>
          Click here to request approval
        </Button> :
        <OverlayTrigger placement="bottom" trigger="hover"
                        overlay={<Tooltip placement="bottom" className="in">You need to confirm your email
                          first</Tooltip>}>
            <span className="d-inline-block">
              <Button disabled style={{ pointerEvents: "none" }}>
                Click here to request approval
              </Button>
            </span>
        </OverlayTrigger>
      }
    </div>;
  } else if (props.user.mentorProfile.status === "requested") {
    toRender = <div>
      <p>You have now requested to be approved. What happens next? <LinkContainer to="/about?type=mentor" style={{
        cursor: "pointer",
        textDecoration: "underline"
      }}><span
      >Find out here</span></LinkContainer>
      </p>
      <Button onClick={() => props.changeMentorStatus("notYetRequested")}>
        Click here to withdraw your request
      </Button>
    </div>;
  } else if (props.user.mentorProfile.status === "rejected") {
    toRender = <div>
      Unfortunately you have been rejected, and this was indicated as the reason:
      <blockquote>
        {props.user.mentorProfile.rejectionReason}
      </blockquote>
    </div>;
  } else if (props.user.mentorProfile.status === "approved") {
    toRender = <div>
      You have been approved to be a mentor, we are now looking for the best match
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
            <h5>{"McKinsey & Co."} is Project Access {props.user.mentorProfile.country}'s Platinum Partner,
              providing the essential financing to make this happen </h5>
            <Image
              src={"https://s1.ibtimes.com/sites/www.ibtimes.com/files/styles/lg/public/2014/05/28/mckinsey-logo.png"}
              style={{ maxWidth: "300px", maxHeight: "150px" }}/>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default MentoringHome;
