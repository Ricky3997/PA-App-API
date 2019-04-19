import React from "react";
import { Badge, Breadcrumb, Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import ProfileIcon from "../../various/ProfileIcon";
import { LinkContainer } from "react-router-bootstrap";
import StatusIcon from "./StatusIcon";
import { Icon } from "react-fa";
import moment from "moment";
import defaults from "../../../defaults/defaults";
import MenteeProfileMentorTile from "./MenteeProfileMentorTile";
import { toast } from "react-toastify";
import RejectionReasonModal from "./RejectionReasonModal";
import FeatureNotReadyYetOnHover from "../../various/FeatureNotReadyYetOnHover";
import NotFound from "../../various/NotFound";
import CountryFlag from "../../various/CountryFlag";
import * as qs from "query-string";
import connect from "react-redux/es/connect/connect";
import { adminChangeUserStatus, removeMentorFromBlacklist, toggleAdminModal } from "../../../actions/actionCreator";

const MenteeAdminProfile = (props) => {

  if (!props.mentee) return <NotFound/>;
  return <Container>
    {props.breadcrumbs ? <Row>
      <Breadcrumb>
        <LinkContainer
          to={qs.parse(window.location.search).from ? `/admin/${qs.parse(window.location.search).from}` : "/admin/mentees"}>
          <Breadcrumb.Item>{qs.parse(window.location.search).from || "Database"}</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active href="#">{props.mentee.firstName}</Breadcrumb.Item>
      </Breadcrumb>
    </Row> : null}

    <Row>
      <Col md={2}>
        <ProfileIcon menteeMode pictureUrl={props.mentee.pictureUrl} size={"l"}/>
      </Col>
      <Col md={2}>
        {props.matching ? <LinkContainer to={`/admin/mentees/${props.mentee._id}?from=matching`}
                                         style={{ cursor: "pointer", textDecoration: "underline", color: "blue" }}>
          <h4>{props.mentee.firstName}</h4>
        </LinkContainer> : <h4>{props.mentee.firstName}</h4>}
      </Col>
      {props.matching ? null : <Col md={{ span: 2, offset: 1 }}>
        <FeatureNotReadyYetOnHover>
          <Button block disabled><Icon name="fas fa-commenting"/> Message</Button>
        </FeatureNotReadyYetOnHover>
      </Col>}

      {props.mentee.status !== "requested" || props.matching ? null : <Col md={2}>
        <Button block variant="danger"
                onClick={props.toggleAdminModal}> Reject </Button>
      </Col>}
      {props.mentee.status !== "requested" || props.matching ? null : <Col md={2}>
        <Button block variant="success"
                onClick={() => props.changeStatus(props.mentee._id, "approved").then(r => {
                  if (r.success) toast.success("Approved");
                  props.history.push("/admin/mentees");
                })}> Approve </Button>
      </Col>}
      {props.details && props.mentee.status === "approved" && !props.mentee.relationship ? <Col md={2}>
        <LinkContainer to={`/admin/matching/${props.mentee._id}`}>
          <Button block variant="info"><Icon name="fas fa-bullseye"/> Match</Button>
        </LinkContainer>
      </Col> : null}
    </Row>

    <br/>

    <Row>

      <Col md={2}>
        <Badge variant="info">{"Status"}</Badge>
      </Col>
      <Col md={4}>
        <StatusIcon
          status={props.mentee.status}
          reason={props.mentee.rejectionReason}/> {props.mentee.latestStatusChange ? `since ${moment(props.mentee.latestStatusChange).format("Do MMM YY")}` : ""}
      </Col>

      <Col md={{ span: 2 }}>
        <Badge variant="info">{"Year of Birth"}</Badge>
      </Col>
      <Col md={4}>
        <Form.Label>{`${props.mentee.yearBorn}`}</Form.Label>
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"From"}</Badge>
      </Col>
      <Col md={4}>
        <Form.Label>{`${props.mentee.city}, ${props.mentee.country}`} <CountryFlag country={props.mentee.country}/>
        </Form.Label>
      </Col>
      <Col md={2}>
        <Badge variant="info">
          {"Largest 3 Cities"}
        </Badge>
      </Col>
      <Col md={4}>
        {props.mentee.fromThreeLargestCity ? "Yes" : "No"}
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Gender Identity"}</Badge>
      </Col>
      <Col md={4}>
        <Form.Label>{`${props.mentee.gender}`} </Form.Label>
      </Col>
      <Col md={2}>
        <Badge variant="info">{"First Generation"}</Badge>
      </Col>
      <Col md={4}>
        <Form.Label>{`${props.mentee.firstGenStudent ? "Yes" : "No"}`} </Form.Label>
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Currently studying"}</Badge>
      </Col>
      <Col md={4}>
        <Form.Label>{`${props.mentee.subjects.join(", ")}`}</Form.Label>
      </Col>
      <Col md={2}>
        <Badge variant="info">{"School graduation year"}</Badge>
      </Col>
      <Col md={4}>
        <Form.Label>{`${props.mentee.year}`}</Form.Label>
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"School"}</Badge>
      </Col>
      <Col md={4}>
        <Form.Label>{`${props.mentee.school}`}</Form.Label>
      </Col>
      <Col md={2}>
        <Badge variant="info">
          {"Type of High School"}
        </Badge>
      </Col>
      <Col md={4}>
        {props.mentee.typeOfHighSchool}
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Level"}</Badge>
      </Col>
      <Col md={4}>
        <Form.Label>{`${props.mentee.level}`}</Form.Label>
      </Col>
      <Col md={2}>
        <Badge variant="info">{"Career Interests"}</Badge>
      </Col>
      <Col md={4}>
        <Form.Label>{`${props.mentee.careerInterests.join(", ")}`}</Form.Label>
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Application Year"}</Badge>
      </Col>
      <Col md={4}>
        <Form.Label>{`${props.mentee.yearApply}`}</Form.Label>
      </Col>
      <Col md={2}>
        <Badge variant="info">{"Hobbies & Interests"}</Badge>
      </Col>
      <Col md={4}>
        <Form.Label>{`${props.mentee.hobbiesAndInterests.join(", ")}`}</Form.Label>
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Applying for"}</Badge>
      </Col>
      <Col md={4}>
        <Form.Label>{`${props.mentee.interestedIn.join(", ")}`}</Form.Label>
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Unis interested"}</Badge>
      </Col>
      <Col>
        {props.mentee.unisApplyingFor.map(uni => <Image
          key={uni}
          src={[...defaults.universities.US, ...defaults.universities.UK].filter(u => u.name === uni)[0].logo}
          style={{ maxHeight: "60px", maxWidth: "130px", marginLeft: "10px" }}/>)}
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Referral"}</Badge>
      </Col>
      <Col md={4}>
        <Form.Label>{`${props.mentee.referral.join(", ")}`}</Form.Label>
      </Col>

      <Col md={2}>
        <Badge variant="info">{"School exam type"}</Badge>
      </Col>
      <Col md={4}>
        <Form.Label>{`${props.mentee.examType}`}</Form.Label>
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Courses"}</Badge>
      </Col>
      <Col>
        <Form.Label>{`${props.mentee.coursesApplyingFor.join(", ")}`}</Form.Label>
      </Col>
    </Row>
    <Row>
      <Col md={2}>
        <Badge variant="info">{"Notes"}</Badge>
      </Col>
      <Col md={4}>
        <Form.Label>{`${props.mentee.notes}`}</Form.Label>
      </Col>
    </Row>

    {props.matching ? null : <Row>
      <Col>
        {props.mentee.relationship ? <div>
          <h5>Mentor</h5>
          <MenteeProfileMentorTile mentee={props.mentee}/>
        </div> : (!props.mentee.relationship && props.mentee.mentorBlackList.length > 0 ? <div>
          <h5>Mentor(s) Blacklist</h5>
          {props.mentee.mentorBlackList.map(m => <MenteeProfileMentorTile
            removeMentorFromBlacklist={props.removeMentorFromBlacklist.bind(null, props.mentee._id)}
            banned mentor={m}/>)}
        </div> : "No Mentor Yet and No Blacklist")}
      </Col>
    </Row>}

    <RejectionReasonModal showModal={props.showModal} name={props.mentee.firstName} id={props.mentee._id}
                          onHide={props.toggleAdminModal} changeStatus={props.changeStatus}/>
  </Container>;
};

export default connect(({ admin }) => {
  return {
    showModal: admin.showModal
  };
}, dispatch => {
  return {
    changeStatus: (id, status, rejectionReason) => dispatch(adminChangeUserStatus("mentee", id, status, rejectionReason)),
    toggleAdminModal: () => dispatch(toggleAdminModal()),
    removeMentorFromBlacklist: (menteeId, mentorId) => dispatch(removeMentorFromBlacklist(menteeId, mentorId))
  };
})(MenteeAdminProfile);;
