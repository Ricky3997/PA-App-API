import React from 'react';
import {
  Badge,
  Breadcrumb,
  Button,
  Card,
  CardColumns,
  Col,
  Container,
  Form,
  Image,
  OverlayTrigger,
  Row,
  Tooltip
} from 'react-bootstrap';
import ProfileIcon from '../../various/ProfileIcon';
import { LinkContainer } from 'react-router-bootstrap';
import StatusIcon from './StatusIcon';
import defaults from '../../../defaults/defaults';
import { Icon } from 'react-fa';
import moment from 'moment';
import RejectionReasonModal from './RejectionReasonModal';
import { toast } from 'react-toastify';
import NotFound from '../../various/NotFound';
import CountryFlag from '../../various/CountryFlag';
import * as qs from 'query-string';
import * as _ from 'lodash';
import { Select } from 'antd';
import UniWithLogoSpan from '../../various/UniWithLogoSpan';
import connect from 'react-redux/es/connect/connect';
import { adminChangeUserStatus, toggleAdminModal, toggleMentorAdmin } from '../../../actions/actionCreator';

const MentorAdminProfile = (props) => {

  if (!props.mentor) return <NotFound/>;
  return <Container>
    {props.breadcrumbs ? <Row>
      <Breadcrumb>
        <LinkContainer
          to={qs.parse(window.location.search).from ? `/admin/${qs.parse(window.location.search).from}` : "/admin/mentors"}>
          <Breadcrumb.Item>{qs.parse(window.location.search).from || "Database"}</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active href="#">{props.mentor.firstName}</Breadcrumb.Item>
      </Breadcrumb>
    </Row> : null}

    <Row>
      <Col md={2}>
        <ProfileIcon mentorMode pictureUrl={props.mentor.pictureUrl} size={"l"}/>
      </Col>
      <Col md={2}>
        <h4>{props.mentor.firstName}</h4>
      </Col>
      {props.matching ? null : <Col md={{ span: 2, offset: 2}}>
        <OverlayTrigger placement="bottom" trigger="hover"
                        overlay={<Tooltip placement="bottom" className="in">Feature not ready yet</Tooltip>}>
            <span className="d-inline-block">
              <LinkContainer to="/message">
          <Button block disabled><Icon name="fas fa-commenting"/> Message</Button>
        </LinkContainer>
            </span>
        </OverlayTrigger>
      </Col>}
      {props.mentor.status !== "requested" || props.matching ? null : <Col md={2}>
        <Button block variant="danger"
                onClick={props.toggleAdminModal}> Reject </Button>
      </Col>}
      {props.mentor.status !== "requested" || props.matching ? null : <Col md={2}>
        <Button block variant="success"
                onClick={() => props.changeStatus(props.mentor._id, "approved").then(r => {
                  if (r.success) toast.success("Approved");
                  props.history.push("/admin/mentors");
                })}> Approve </Button>
      </Col>}
      {props.mentor.status === "approved" && !props.matching ? <Col md={3}>
        {props.mentor.admin || props.mentor.campusTeamAdmin ?
          <Button block variant="danger"
                  disabled={props.mentor.admin === "superadmin" && props.user.mentorProfile.admin !== "superadmin"}
                  onClick={() => props.toggleMentorAdmin(props.mentor._id, undefined, _.some([...defaults.universities.UK, ...defaults.universities.US], u => u.name === props.mentor.campusTeamAdmin)).then(r => {
                    if (r.success) toast.success("Admin removed");
                  })}>
            {props.mentor.admin === "superadmin" ? "🌎" : (props.mentor.campusTeamAdmin ?
              <UniWithLogoSpan height={'20px'} logo={[...defaults.universities.UK, ...defaults.universities.US].filter(u => u.name === props.mentor.campusTeamAdmin)[0].logo}/> :
              <CountryFlag country={props.mentor.admin}/>)} Admin -
            Revoke <Icon name="fas fa-times-circle"/>
          </Button>
          : (props.user.mentorProfile.admin === "superadmin" ? <Select showSearch
                                                                       mode={"default"}
                                                                       placeholder={"Make admin"}
                                                                       size={"large"}
                                                                       onSelect={v => {
                                                                         const campus = _.some([...defaults.universities.UK, ...defaults.universities.US], u => u.name ===v);
                                                                         props.toggleMentorAdmin(props.mentor._id, v, campus).then(r => {
                                                                           if (r.success) toast.success(`Admin enabled for ${v}`);
                                                                         });
                                                                       }}
                                                                       style={{ width: "150px" }}
                                                                       tokenSeparators={[",", ":"]}>

            <Select.Option value={"superadmin"}>🌎 Superadmin</Select.Option>
            <Select.OptGroup label={"Country"}>
              {defaults.countries_operating.map(c => <Select.Option value={c}><span><CountryFlag
                country={c}/>{" "}{c}</span></Select.Option>)}
            </Select.OptGroup>
            <Select.OptGroup label={"Campus"}>
              {[...defaults.universities.UK, ...defaults.universities.US].map(u => <Select.Option
                value={u.name}><UniWithLogoSpan {...u} /></Select.Option>)}
            </Select.OptGroup>

          </Select> : <Button block variant="warning"><Icon name="fas fa-user-secret"/> Make Admin</Button>)}
      </Col> : null}
    </Row>

    <br/>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Status"}</Badge>
      </Col>
      <Col md={4}>
        <StatusIcon status={props.mentor.status}
                    reason={props.mentor.rejectionReason}/> {props.mentor.latestStatusChange ? `since ${moment(props.mentor.latestStatusChange).format("Do MMM YY")}` : ""}
      </Col>
      <Col md={2}>
        <Badge variant="info">
          <Image src={"http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c528.png"}
                 style={{ maxHeight: "16px" }}/>
        </Badge>
      </Col>
      <Col md={4}>
        <a href={props.mentor.linkedinUrl} rel="noopener noreferrer"
           target="_blank">{props.mentor.linkedinUrl}</a>
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"From"}</Badge>
      </Col>
      <Col md={4}>
        <Form.Label>{`${props.mentor.city}, ${props.mentor.country}`} <CountryFlag country={props.mentor.country}/>
        </Form.Label>
      </Col>
      <Col md={2}>
        <Badge variant="info">
          {"Largest 3 Cities"}
        </Badge>
      </Col>
      <Col md={4}>
        {props.mentor.fromThreeLargestCity ? "Yes" : "No"}
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Gender Identity"}</Badge>
      </Col>
      <Col md={4}>
        <Form.Label>{`${props.mentor.gender}`} </Form.Label>
      </Col>
      <Col md={2}>
        <Badge variant="info">
          {"Ethnic Background"}
        </Badge>
      </Col>
      <Col md={4}>
        {props.mentor.ethnicBackground}
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"First Generation"}</Badge>
      </Col>
      <Col md={4}>
        <Form.Label>{`${props.mentor.firstGenStudent ? "Yes" : "No"}`} </Form.Label>
      </Col>
      <Col md={2}>
        <Badge variant="info">
          {"Type of High School"}
        </Badge>
      </Col>
      <Col md={4}>
        {props.mentor.typeOfHighSchool}
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Currently studying"}</Badge>
      </Col>
      <Col md={4}>
        <Form.Label>{`${props.mentor.subject}`}</Form.Label>
      </Col>
      <Col md={2}>
        <Badge variant="info">
          {"Subjects in School"}
        </Badge>
      </Col>
      <Col md={4}>
        {props.mentor.subjectsInSchool.join(", ")}
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"University"}</Badge>
      </Col>
      <Col md={4}>
        <Image
          src={[...defaults.universities.US, ...defaults.universities.UK].filter(u => u.name === props.mentor.university)[0].logo}
          style={{ maxHeight: "60px", maxWidth: "130px" }}/>
      </Col>
      <Col md={2}>
        <Badge variant="info">{"Other Offers From"}</Badge>
      </Col>
      <Col md={4}>
        {props.mentor.offersFromUnis.map(uni => <Image
          key={uni}
          src={[...defaults.universities.US, ...defaults.universities.UK].filter(u => u.name === uni)[0].logo}
          style={{ maxHeight: "60px", maxWidth: "130px" }}/>)
        }
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Level"}</Badge>
      </Col>
      <Col md={4}>
        <Form.Label>{`${props.mentor.level}`}</Form.Label>
      </Col>
      <Col md={2}>
        <Badge variant="info">{"Career Interests"}</Badge>
      </Col>
      <Col md={4}>
        <Form.Label>{`${props.mentor.careerInterests.join(", ")}`}</Form.Label>
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Year"}</Badge>
      </Col>
      <Col md={4}>
        <Form.Label>{`${props.mentor.year}`}</Form.Label>
      </Col>
      <Col md={2}>
        <Badge variant="info">{"Hobbies & Interests"}</Badge>
      </Col>
      <Col md={4}>
        <Form.Label>{`${props.mentor.hobbiesAndInterests.join(", ")}`}</Form.Label>
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Graduation Year"}</Badge>
      </Col>
      <Col md={4}>
        <Form.Label>{`${props.mentor.yearGraduation}`}</Form.Label>
      </Col>
      <Col md={2}>
        <Badge variant="info">{"Year of Birth"}</Badge>
      </Col>
      <Col md={4}>
        <Form.Label>{`${props.mentor.yearBorn}`}</Form.Label>
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Referral"}</Badge>
      </Col>
      <Col md={4}>
        <Form.Label>{`${props.mentor.referral.join(", ")}`}</Form.Label>
      </Col>
      <Col md={2}>
        <Badge variant="info">{"Notes"}</Badge>
      </Col>
      <Col md={4}>
        <Form.Label>{`${props.mentor.notes}`}</Form.Label>
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Max Mentees"}</Badge>
      </Col>
      <Col md={4}>
        <Form.Label>{`${props.mentor.maxNumberOfMentees}`}</Form.Label>
      </Col>
    </Row>

    <Row>
      <Col>
        {props.mentor.relationship.length > 0 ? <div>
          <h5>Mentees</h5>
          <CardColumns>
            {props.mentor.relationship.map(r =>
              <Card key={r.mentee._id} className="text-center">
                <Card.Header>
                  <ProfileIcon pictureUrl={r.mentee.pictureUrl} size={"l"} mentorMode/>
                  {r.status === "awaitingConfirmation" ? <Badge variant={"warning"}>pending</Badge> : null}
                </Card.Header>
                <Card.Body>
                  <LinkContainer to={`/admin/mentees/${r.mentee._id}`} className='blue_link'>
                    <Card.Title>{r.mentee.firstName}</Card.Title>
                  </LinkContainer>
                  <Card.Text>
                    Last message exchanged: TODO
                  </Card.Text>
                  <LinkContainer to={`/admin/dashboard/${r._id}`} className='blue_link'>
                    <Button variant={"light"}>Go to relationship</Button>
                  </LinkContainer>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Matched on {moment(r.matchedOn).format("MMM Do YYYY")}</small>
                </Card.Footer>
              </Card>
            )}
          </CardColumns>
        </div> : "No Mentees Yet"}
      </Col>
    </Row>

    <RejectionReasonModal showModal={props.showModal} name={props.mentor.firstName} id={props.mentor._id}
                          onHide={props.toggleAdminModal} changeStatus={props.changeStatus}/>

  </Container>;
};

export default connect(({ user, admin }) => {
  return {
    user,
    showModal: admin.showModal
  };
}, dispatch => {
  return {
    changeStatus: (id, status, rejectionReason) => dispatch(adminChangeUserStatus("mentor", id, status, rejectionReason)),
    toggleAdminModal: () => dispatch(toggleAdminModal()),
    toggleMentorAdmin: (mentorId, mentorValue, campusTeamAdmin) => dispatch(toggleMentorAdmin(mentorId, mentorValue, campusTeamAdmin))
  };
})(MentorAdminProfile);;
