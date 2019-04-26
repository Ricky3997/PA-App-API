import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import connect from 'react-redux/es/connect/connect';
import { confirmMatch, showMatchingConfirmation, unsetMatchingConfirmation } from '../../../actions/actionCreator';
import { toast } from 'react-toastify';

const ConfirmMatchButton = (props) => {

  return (
    <div>
      {props.showConfirm === props.mentorId ?
        <Row>
          <Col>
            <Button block variant="danger" onClick={props.unsetMatchingConfirmation}>Cancel</Button>
          </Col>
          <Col>
            <Button block variant="success" disabled={props.fetching}
                    onClick={() => props.confirmMatch(props.mentorId, props.menteeToMatch)}>{props.fetching ?
              < ReactLoading type={"spin"} color={"#ffffff"} height={24} width={24}/> : "Confirm"}</Button>
          </Col>
        </Row>
        : <Button block onClick={() => props.showConfirmation(props.mentorId)}>Match as Mentor</Button>}
    </div>
  );

};

export default connect(({ admin, matching }) => {
  return {
    fetching: admin.fetching,
    showConfirm: matching.showConfirm,
  };
}, dispatch => {
  return {
    confirmMatch: (mentorId, menteeeId) => dispatch(confirmMatch(mentorId, menteeeId)).then(p => {
      if (p.success) toast.success("Matched");
    }),
    showConfirmation: (id) => dispatch(showMatchingConfirmation(id)),
    unsetMatchingConfirmation: () => dispatch(unsetMatchingConfirmation())
  };
})(ConfirmMatchButton);;
