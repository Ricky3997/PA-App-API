import React from "react";
import { Button, Col, Row } from "react-bootstrap";
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
      <Button onClick={() => props.changeMenteeStatus("requested")}>
        Click here to request approval
      </Button>
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
                        You don't have a Mentor yet <span role="img" aria-label="time waiting">⏳</span>
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
