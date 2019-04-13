import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import connect from "react-redux/es/connect/connect";
import { mentorDecisionRelationship, toggleMentorConfirmDecision } from "../../../actions/actionCreator";

const ConfirmAcceptMentee = ({toggleMentorConfirmDecision, mentorDecisionRelationship, showConfirmDecision, relationshipId}) => {
  if (showConfirmDecision === `reject_${relationshipId}`) return <Row>
    <Col md={12}>
      <h4>Are you really sure you can't help this mentee?</h4>
    </Col>
    <Col md={4}>
      <Button block variant='warning' onClick={() => toggleMentorConfirmDecision("")}>Cancel</Button>
    </Col>
    <Col md={8}>
      <Button block variant='danger' onClick={() => mentorDecisionRelationship(relationshipId, false).then(r => {
        if (r.success) toast.success("Rejection saved");
      })}>I confirm I cannot help</Button>
    </Col>
  </Row>;
  else if (showConfirmDecision === `accept_${relationshipId}`) return <Row>
    <Col md={12}>
      <h5>Do you confirm you can help this mentee?</h5>
    </Col>
    <Col md={4}>
      <Button block variant='warning' onClick={() => toggleMentorConfirmDecision("")}>Cancel</Button>
    </Col>
    <Col md={8}>
      <Button block variant='success' onClick={() => mentorDecisionRelationship(relationshipId, true).then(r => {
        if (r.success) toast.success("Confirmed");
      })}>I confirm I can help!</Button>
    </Col>
  </Row>;
  else return <Row>
      <Col md={6}>
        <Button block variant='danger'
                onClick={() => toggleMentorConfirmDecision(`reject_${relationshipId}`)}>Sorry can't
          help</Button>
      </Col>
      <Col md={6}>
        <Button block variant='success'
                onClick={() => toggleMentorConfirmDecision(`accept_${relationshipId}`)}>Yes I
          confirm!</Button>
      </Col>
    </Row>;

};

export default connect(({ mentorHome }) => {
  return { showConfirmDecision: mentorHome.showConfirmDecision };
}, dispatch => {
  return {
    toggleMentorConfirmDecision: (showConfirmDecision) => dispatch(toggleMentorConfirmDecision(showConfirmDecision)),
    mentorDecisionRelationship: (relationshipId, accept) => dispatch(mentorDecisionRelationship(relationshipId, accept))
  };
})(ConfirmAcceptMentee);
