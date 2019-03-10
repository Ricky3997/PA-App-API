import React from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import ProfileIcon from "../../various/ProfileIcon";
import MentorAdminprofile from "./MentorAdminProfile";

const Approvals = (props) => {
    const { setActiveApprovalId, activeApprovalId } = props;
    const toApprove = activeApprovalId ? props[props.mentorMode ? "mentors" : "mentees"].filter(m => m._id === activeApprovalId)[0] : null;

    return (
      <Container fluid>
        <Row>
          <Col md={3}>
            <ListGroup>
              {
                props[props.mentorMode ? "mentors" : "mentees"].length > 0 ?
                  props[props.mentorMode ? "mentors" : "mentees"].map(m => <ListGroup.Item
                    active={m._id === activeApprovalId}
                    onClick={() => setActiveApprovalId(m._id)}
                    style={{ cursor: "pointer" }}>
                    <ProfileIcon pictureUrl={m.pictureUrl} size={"s"} mentorMode={props.mentorMode}/>
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

              <MentorAdminprofile approvalMode mentor={toApprove} breadcrumbs={false} />

              <Row>
                <Col md={{ size: 2, offset: 8 }}>
                  <Button block variant="danger"
                          onClick={() => props.adminChangeUserStatus(toApprove._id, "rejected", props.mentorMode ? "mentor" : "mentee")}> Reject </Button>
                </Col>
                <Col md={{ size: 2 }}>
                  <Button block variant="success"
                          onClick={() => props.adminChangeUserStatus(toApprove._id, "approved", props.mentorMode ? "mentor" : "mentee")}> Approve </Button>
                </Col>
              </Row>
            </Container> : <div><h4>Nothing to approve</h4></div>}
          </Col>
        </Row>
      </Container>
    );
  }
;


export default Approvals;
