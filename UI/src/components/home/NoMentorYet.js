import React from "react";
import { Button, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import NotReadyYet from "./MenteeHome";

const NoMentorYet = (props) => {

  let toRender;
  if (!props.user.onboarded) {
    toRender = <Button onClick={() => props.history.push("/onboard")}>
      Looks like you are not onboarded, go finish
    </Button>;
  } else if (props.user.menteeProfile.status === "notYetRequested") {
    toRender = <div>
      <p>
        You can now request approval to have a mentor
      </p>

      {props.user.emailConfirmed ? <Button onClick={() => props.toggleMenteeHomeModal() }>
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
  } else if (props.user.menteeProfile.status === "requested") {
    toRender = <div>
      <p>You have now requested approval to have a mentor
      </p>
      <Button onClick={() => props.changeMenteeStatus("notYetRequested")}>
        Click here to withdraw your request
      </Button>
    </div>;
  } else if (props.user.menteeProfile.status === "approved") {
    toRender = <div>
      You have been approved to have a mentor, we are now looking for the best match
    </div>;
  } else if (props.user.menteeProfile.status === "rejected") {
    toRender = <div>
      You have been rejected to have a mentor, but you can still help like this
    </div>;
  } else toRender = <NotReadyYet/>;

    return (
        <div>
            <Row>
                <Col>
                    <h4>
                        You don't have a mentor yet <span role="img" aria-label="time waiting">⏳</span>
                    </h4>
                </Col>
            </Row>
            <Row>
                <Col>
                  {toRender}
                </Col>
            </Row>
        </div>
    );
};

export default NoMentorYet;
