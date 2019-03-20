import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";

const queryString = require("query-string");

class Confirm extends Component {

  componentDidMount() {
    const qs = queryString.parse(this.props.location.search);
    const { token, id } = qs;
    if (token && id) {
      this.props.history.push({ search: "" });
      this.props.confirmEmailAddress(token, id).then(r => {
        if (r.success) {
          this.props.history.push("/");
          toast.success("Your email address has been confirmed!");
        } else toast.error("Something went wrong confirming your email, sorry!");
      });
    }
  }

  render() {
    return (
      <Container fluid>
        <Container className="onboarding">
          <Row className="justify-content-md-center">
            <Col md={6} style={{ paddingTop: "130px" }}>
              Confirming...
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

export default Confirm;
