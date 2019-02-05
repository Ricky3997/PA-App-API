import React, { Component } from "react";
import { Button, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import ProfileIcon from "../../various/ProfileIcon";

class Approvals extends Component {

  render() {
    const { setActiveMentorApprovalId,activeApprovalId } = this.props;
    const toApprove = activeApprovalId ? this.props.mentors.filter(m => m._id === activeApprovalId)[0] : null;
    return (
      <Container fluid>
        <Row>
          <Col md={3}>
            <ListGroup>
              {
                this.props.mentors.length > 0 ?
                  this.props.mentors.map(m => <ListGroup.Item active={m._id === activeApprovalId}
                                                              onClick={() => setActiveMentorApprovalId(m._id)}
                                                              style={{ cursor: "pointer" }}>
                    <ProfileIcon pictureUrl={m.pictureUrl} size={"s"}/>
                    {`  ${m.firstName}`}
                  </ListGroup.Item>) :
                  <ListGroup.Item>
                    No Mentors to Approve
                  </ListGroup.Item>

              }
            </ListGroup>
          </Col>
          <Col md={9}>{toApprove ?
            <Container fluid>
              <Row>
                <Col md={3}>
                  <ProfileIcon pictureUrl={toApprove.pictureUrl} size={"m"}/>
                </Col>
                <Col md={9}>
                  <h6>{`${toApprove.firstName}`}</h6>
                  <h6>{`${toApprove.subject} at ${toApprove.university}`}</h6>
                  <h6>{`From ${toApprove.city}`}</h6>
                </Col>
              </Row>
              <Row>
                <Col md={{ size: 2, offset: 8 }}>
                  <Button block variant="danger" onClick={() => this.props.adminChangeMentorStatus(toApprove._id, "rejected")}> Reject </Button>
                </Col>
                <Col md={{ size: 2 }}>
                  <Button block variant="success" onClick={() => this.props.adminChangeMentorStatus(toApprove._id, "approved")}> Approve </Button>
                </Col>
              </Row>
            </Container> : <div><h4>Nothing to approve</h4></div>}
          </Col>
        </Row>
      </Container>
    );
  }

};


export default Approvals;
