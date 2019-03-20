import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";

const ConfirmAcceptMentee = (props) => {
  if (props.mentorHome.showConfirmDecision === `reject_${props.relationshipId}`) return <Row>
    <Col md={4}>
      <Button block variant='warning' onClick={() => props.toggleMentorConfirmDecision("")}>Cancel</Button>
    </Col>
    <Col md={8}>
      <Button block variant='danger' onClick={() => props.mentorDecisionRelationship(false).then(r => {
        if (r.success) toast.success("Rejection saved");
      })}>I confirm I cannot help</Button>
    </Col>
  </Row>;
  else if (props.mentorHome.showConfirmDecision === `accept_${props.relationshipId}`) return <Row>
    <Col md={4}>
      <Button block variant='warning' onClick={() => props.toggleMentorConfirmDecision("")}>Cancel</Button>
    </Col>
    <Col md={8}>
      <Button block variant='success' onClick={() => props.mentorDecisionRelationship(true).then(r => {
        if (r.success) toast.success("Confirmed");
      })}>I confirm I can help!</Button>
    </Col>
  </Row>;
  else return <Row>
      <Col md={6}>
        <Button block variant='danger'
                onClick={() => props.toggleMentorConfirmDecision(`reject_${props.relationshipId}`)}>Sorry can't
          help</Button>
      </Col>
      <Col md={6}>
        <Button block variant='success'
                onClick={() => props.toggleMentorConfirmDecision(`accept_${props.relationshipId}`)}>Yes I
          confirm!</Button>
      </Col>
    </Row>;

};

export default ConfirmAcceptMentee;
