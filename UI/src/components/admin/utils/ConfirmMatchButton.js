import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import ReactLoading from "react-loading";

const ConfirmMatchButton = (props) => {

  return (
    <div>
      {props.showConfirm ?
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

export default ConfirmMatchButton;
