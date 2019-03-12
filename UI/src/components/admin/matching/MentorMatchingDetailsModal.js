import React from "react";
import { Badge, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Formik, Form as FormikForm, Field } from "formik";
import { Icon } from "react-fa";
import * as Yup from "yup";
import * as _ from "lodash";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import MentorAdminProfile from "../utils/MentorAdminProfile";

const MentorMatchingDetailsModal = (props) => {
  return <span>
    <span onMouseEnter={props.toggleMatchingDetailsModal}>
      <Badge variant={'info'}>{' details'}</Badge>
    </span>
    <Modal
      size="lg"
      centered
      onHide={props.toggleMatchingDetailsModal}
      show={props.matching.showDetailsModal}
    >
      <Modal.Body>
        <MentorAdminProfile {...props} matching />
      </Modal.Body>
    </Modal>
  </span>;
};

export default MentorMatchingDetailsModal;
