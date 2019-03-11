import React from "react";
import {
  Col,
  Image,
  Row,
  Breadcrumb,
  Container,
  Badge,
  Form,
  Card,
  Button,
  Tooltip, OverlayTrigger
} from "react-bootstrap";
import ProfileIcon from "../../various/ProfileIcon";
import { LinkContainer } from "react-router-bootstrap";
import StatusIcon from "./StatusIcon";
import countries from "svg-country-flags/countries";
import { Icon } from "react-fa";
import moment from "moment";

const MenteeAdminProfile = (props) => {

  if (!props.mentee) return <Image src={"https://media.giphy.com/media/6uGhT1O4sxpi8/giphy.gif"}/>;
  let flagIndex = "";
  Object.entries(countries).forEach((a) => {
    if (props.mentee.country === a[1]) flagIndex = a[0];
  });
  const flag = require(`svg-country-flags/svg/${flagIndex.toLowerCase()}.svg`);
  return <Container>
    {props.beadcrumbs ? <Row>
      <Breadcrumb>
        <LinkContainer to={"/admin/mentees/database"}>
          <Breadcrumb.Item>Database</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active href="#">{props.mentee.firstName}</Breadcrumb.Item>
      </Breadcrumb>
    </Row> : null}

    <Row>
      <Col md={2}>
        <ProfileIcon menteeMode pictureUrl={props.mentee.pictureUrl} size={"xl"}/>
      </Col>
      <Col md={2}>
        <h4>{props.mentee.firstName}</h4>
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
      {props.approvalMode || props.mentee.status !== "requested" ? null : <Col md={2}>
        <LinkContainer to={`/admin/mentees/approvals/${props.mentee._id}`}>
          <Button block variant="warning"><Icon name="fas fa-balance-scale"/> Approve</Button>
        </LinkContainer>
      </Col>}
    </Row>

    <br/>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Status"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <StatusIcon
          status={props.mentee.status}/> {props.mentee.latestStatusChange ? `since ${moment(props.mentee.latestStatusChange).format("Do MMM YY")}` : ""}
      </Col>

      {/*<Col md={2}>*/}
        {/*<Badge variant="info">{"TODO"}</Badge>*/}
      {/*</Col>*/}
      {/*<Col md={{ span: 3 }}>*/}
        {/*<Form.Label>{`${'TODO'}`}</Form.Label>*/}
      {/*</Col>*/}
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"From"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Form.Label>{`${props.mentee.city}, ${props.mentee.country}`} <img alt={props.mentee.country}
                                                                           width="15px" src={flag}/>
        </Form.Label>
      </Col>
      <Col md={2}>
        <Badge variant="info">
          {"Largest 3 Cities"}
        </Badge>
      </Col>
      <Col md={{ span: 3 }}>
        {props.mentee.fromThreeLargestCity ? "Yes" : "No"}
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Gender Identity"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Form.Label>{`${props.mentee.gender}`} </Form.Label>
      </Col>
      {/*<Col md={2}>*/}
        {/*<Badge variant="info">*/}
          {/*{"Ethnic Background"}*/}
        {/*</Badge>*/}
      {/*</Col>*/}
      {/*<Col md={{ span: 3 }}>*/}
        {/*{props.mentee.ethnicBackground}*/}
      {/*</Col>*/}
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"First Generation"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Form.Label>{`${props.mentee.firstGenStudent ? "Yes" : "No"}`} </Form.Label>
      </Col>
      <Col md={2}>
        <Badge variant="info">
          {"Type of High School"}
        </Badge>
      </Col>
      <Col md={{ span: 3 }}>
        {props.mentee.typeOfHighSchool}
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Currently studying"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Form.Label>{`${props.mentee.subjects.join(', ')}`}</Form.Label>
      </Col>
      {/*<Col md={2}>*/}
        {/*<Badge variant="info">{"TODO"}</Badge>*/}
      {/*</Col>*/}
      {/*<Col md={{ span: 3 }}>*/}
        {/*<Form.Label>{`${'TODO'}`}</Form.Label>*/}
      {/*</Col>*/}
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"School"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Form.Label>{`${props.mentee.school}`}</Form.Label>
      </Col>
      {/*<Col md={2}>*/}
        {/*<Badge variant="info">{"TODO"}</Badge>*/}
      {/*</Col>*/}
      {/*<Col md={{ span: 3 }}>*/}
        {/*<Form.Label>{`${'TODO'}`}</Form.Label>*/}
      {/*</Col>*/}
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Level"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Form.Label>{`${props.mentee.level}`}</Form.Label>
      </Col>
      <Col md={2}>
        <Badge variant="info">{"Career Interests"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Form.Label>{`${props.mentee.careerInterests.join(", ")}`}</Form.Label>
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Year"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Form.Label>{`${props.mentee.year}`}</Form.Label>
      </Col>
      <Col md={2}>
        <Badge variant="info">{"Hobbies & Interests"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Form.Label>{`${props.mentee.hobbiesAndInterests.join(", ")}`}</Form.Label>
      </Col>
    </Row>

    <Row>
      <Col md={2}>
        <Badge variant="info">{"Expected Start"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Form.Label>{`${props.mentee.yearStart}`}</Form.Label>
      </Col>
      <Col md={{span:2}}>
        <Badge variant="info">{"Year of Birth"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Form.Label>{`${props.mentee.yearBorn}`}</Form.Label>
      </Col>
    </Row>

    <Row>
      {/*<Col md={2}>*/}
        {/*<Badge variant="info">{"TODO"}</Badge>*/}
      {/*</Col>*/}
      {/*<Col md={{ span: 3 }}>*/}
        {/*<Form.Label>{`${'TODO'}`}</Form.Label>*/}
      {/*</Col>*/}
      <Col md={2}>
        <Badge variant="info">{"Referral"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Form.Label>{`${props.mentee.referral.join(", ")}`}</Form.Label>
      </Col>
    </Row>

    {props.approvalMode ? null : <Row>
      <Col>
        {props.mentee.relationship ? <div>
          <h5>Mentor</h5>
          <Card>
            <Card.Header>
              <ProfileIcon pictureUrl={props.meentee.relationship.mentor.pictureUrl} size={"l"}/>
            </Card.Header>
            <Card.Body>
              <LinkContainer to={`/admin/mentors/database/${props.meentee.relationship.mentor._id}`}
                             style={{ cursor: "pointer", textDecoration: "underline", color: "blue" }}>
                <Card.Title>{props.meentee.relationship.mentor.firstName}</Card.Title>
              </LinkContainer>
              <Card.Text>
                Last message exchanged: TODO
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Matched on {moment(props.meentee.relationship.matchedOn).format("MMM Do YYYY")}</small>
            </Card.Footer>
          </Card>
        </div> : "No Mentor Yet"}
      </Col>
    </Row>}
  </Container>;
};

export default MenteeAdminProfile;
