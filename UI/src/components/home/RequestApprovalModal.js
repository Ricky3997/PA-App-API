import React from "react";
import { Button, Modal } from "react-bootstrap";

const RequestApprovalModal = (props) => {
  return <Modal
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    backdrop="static"
    show={props.show}
    onHide={props.onHide}
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        We just need a couple more questions
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h4>Centered Modal</h4>
      <p>
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
        ac consectetur ac, vestibulum at eros.
      </p>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>;

};

export default RequestApprovalModal;
