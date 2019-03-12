import React, { Component } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import ProfileIcon from "../../various/ProfileIcon";
import MentorAdminprofile from "./MentorAdminProfile";
import { toast } from "react-toastify";
import MenteeAdminProfile from "./MenteeAdminProfile";
import RejectionReasonModal from "./RejectionReasonModal";


class Approvals extends Component {

  componentDidMount() {
    if (this.props.match.params.id) this.props.setActiveApprovalId(this.props.match.params.id);
  }

  render() {
    const props = this.props;
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
                    key={m._id}
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

              {props.mentorMode ? <MentorAdminprofile approvalMode mentor={toApprove} breadcrumbs={false}/> :
                <MenteeAdminProfile approvalMode mentee={toApprove} breadcrumbs={false}/>}

              <Row>
                <Col md={{ size: 2, offset: 8 }}>
                  <Button block variant="danger"
                          onClick={props.toggleAdminModal}> Reject </Button>
                </Col>
                <Col md={{ size: 2 }}>
                  <Button block variant="success"
                          onClick={() => props.changeStatus(toApprove._id, "approved").then(r => {
                            if (r.success) toast.success("Approved");
                          })}> Approve </Button>
                </Col>
              </Row>
            </Container> : <div><h4>Nothing to approve</h4></div>}
          </Col>
        </Row>
        {toApprove ? <RejectionReasonModal showModal={props.showModal} name={toApprove.firstName} id={toApprove._id}
                              onHide={props.toggleAdminModal} changeStatus={props.changeStatus} /> : null}
      </Container>
    );
  }
}

export default Approvals;
