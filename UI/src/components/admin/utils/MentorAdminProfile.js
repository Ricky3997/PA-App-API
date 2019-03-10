import React from "react";
import {
  Col,
  Image,
  Row,
  Breadcrumb,
  Container,
  Badge,
  Form,
  CardColumns,
  Card,
  Button,
  Tooltip, OverlayTrigger
} from "react-bootstrap";
import ProfileIcon from "../../various/ProfileIcon";
import { LinkContainer } from "react-router-bootstrap";
import StatusIcon from "./StatusIcon";
import defaults from "../../../defaults/defaults";
import countries from "svg-country-flags/countries";
import { Icon } from "react-fa";
import moment from "moment";

const MentorAdminProfile = (props) => {

  if (!props.mentor) return <Image src={"https://media.giphy.com/media/6uGhT1O4sxpi8/giphy.gif"}/>;
  let flagIndex = "";
  Object.entries(countries).forEach((a) => {
    if (props.mentor.country === a[1]) flagIndex = a[0];
  });
  const flag = require(`svg-country-flags/svg/${flagIndex.toLowerCase()}.svg`);
  return <Container>
    {props.beadcrumbs ? <Row>
      <Breadcrumb>
        <LinkContainer to={"/admin/mentors/database"}>
          <Breadcrumb.Item componentClass="div">Database</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active href="#">{props.mentor.firstName}</Breadcrumb.Item>
      </Breadcrumb>
    </Row> : null}

    <Row>
      <Col md={2}>
        <ProfileIcon mentorMode pictureUrl={props.mentor.pictureUrl} size={"xl"}/>
      </Col>
      <Col md={2}>
        <h4>{props.mentor.firstName}</h4>
      </Col>
      {props.approvalMode ? null : <Col md={{ span: 2, offset: 1 }}>
        <OverlayTrigger placement="bottom" trigger="hover"
                        overlay={<Tooltip placement="bottom" className="in">Feature not ready yet</Tooltip>}>
            <span className="d-inline-block">
              <LinkContainer to="/message">
          <Button block disabled><Icon name="fas fa-commenting"/> Message</Button>
        </LinkContainer>
            </span>
        </OverlayTrigger>

      </Col>}
    </Row>

    <br/>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Status"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <StatusIcon status={props.mentor.status}/>
      </Col>
      <Col md={2}>
        <Badge variant="info">
          <Image src={"http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c528.png"}
                 style={{ maxHeight: "16px" }}/>
        </Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <a href={props.mentor.linkedinUrl} rel="noopener noreferrer"
           target="_blank">{props.mentor.linkedinUrl}</a>
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"From"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Form.Label>{`${props.mentor.city}, ${props.mentor.country}`} <img alt={props.mentor.country}
                                                                           width="15px" src={flag}/>
        </Form.Label>
      </Col>
      <Col md={2}>
        <Badge variant="info">
          {"Largest 3 Cities"}
        </Badge>
      </Col>
      <Col md={{ span: 3 }}>
        {props.mentor.fromThreeLargestCity ? "Yes" : "No"}
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Gender Identity"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Form.Label>{`${props.mentor.gender}`} </Form.Label>
      </Col>
      <Col md={2}>
        <Badge variant="info">
          {"Ethnic Background"}
        </Badge>
      </Col>
      <Col md={{ span: 3 }}>
        {props.mentor.ethnicBackground}
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"First Generation"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Form.Label>{`${props.mentor.firstGenStudent ? "Yes" : "No"}`} </Form.Label>
      </Col>
      <Col md={2}>
        <Badge variant="info">
          {"Type of High School"}
        </Badge>
      </Col>
      <Col md={{ span: 3 }}>
        {props.mentor.typeOfHighSchool}
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Currently studying"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Form.Label>{`${props.mentor.subject}`}</Form.Label>
      </Col>
      <Col md={2}>
        <Badge variant="info">
          {"Subjects in School"}
        </Badge>
      </Col>
      <Col md={{ span: 3 }}>
        {props.mentor.subjectsInSchool.join(", ")}
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"University"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Image
          src={[...defaults.universities.US, ...defaults.universities.UK].filter(u => u.name === props.mentor.university)[0].logo}
          style={{ maxHeight: "60px", maxWidth: "130px" }}/>
      </Col>
      <Col md={2}>
        <Badge variant="info">{"Other Offers From"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        {props.mentor.offersFromUnis.map(uni => <Image
          src={[...defaults.universities.US, ...defaults.universities.UK].filter(u => u.name === uni)[0].logo}
          style={{ maxHeight: "60px", maxWidth: "130px" }}/>)
        }
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Level"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Form.Label>{`${props.mentor.level}`}</Form.Label>
      </Col>
      <Col md={2}>
        <Badge variant="info">{"Career Interests"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Form.Label>{`${props.mentor.careerInterests.join(", ")}`}</Form.Label>
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Year"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Form.Label>{`${props.mentor.year}`}</Form.Label>
      </Col>
      <Col md={2}>
        <Badge variant="info">{"Hobbies & Interests"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Form.Label>{`${props.mentor.hobbiesAndInterests.join(", ")}`}</Form.Label>
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Graduation Year"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Form.Label>{`${props.mentor.yearGraduation}`}</Form.Label>
      </Col>
      <Col md={2}>
        <Badge variant="info">{"Year of Birth"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Form.Label>{`${props.mentor.yearBorn}`}</Form.Label>
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Max Mentees"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Form.Label>{`${props.mentor.maxNumberOfMentees}`}</Form.Label>
      </Col>
      <Col md={2}>
        <Badge variant="info">{"Referral"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Form.Label>{`${props.mentor.referral.join(", ")}`}</Form.Label>
      </Col>
    </Row>

    {props.approvalMode ? null : <Row>
      <Col>
        {props.mentor.relationship.length > 0 ? <div>
          <h5>Mentees</h5>
          <CardColumns>
            {props.mentor.relationship.map(r =>
              <Card>
                <Card.Header>
                  <ProfileIcon pictureUrl={r.mentee.pictureUrl} size={"l"} mentorMode/>
                </Card.Header>
                <Card.Body>
                  <LinkContainer to={`/admin/mentees/database/${r.mentee._id}`} style={{cursor: 'pointer', textDecoration: 'underline', color: 'blue'}}>
                    <Card.Title>{r.mentee.firstName}</Card.Title>
                  </LinkContainer>
                  <Card.Text>
                    Last message exchanged: TODO
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Matched on {moment(r.matchedOn).format("MMM Do YYYY")}</small>
                </Card.Footer>
              </Card>
            )}
          </CardColumns>
        </div> : "No Mentees Yet"}
      </Col>
    </Row>}
  </Container>;
};

export default MentorAdminProfile;
