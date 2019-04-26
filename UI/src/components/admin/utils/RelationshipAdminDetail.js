import React from 'react';
import { Badge, Breadcrumb, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ProfileIcon from '../../various/ProfileIcon';
import { toast } from 'react-toastify';
import NotFound from '../../various/NotFound';
import FeatureNotReadyYetOnHover from '../../various/FeatureNotReadyYetOnHover';
import CardDeck from 'react-bootstrap/CardDeck';
import { Icon } from 'react-fa';


const RelationshipAdminDetail = (props) => {

  return props.relationship ? <Container>
      <Row>
        <Breadcrumb>
          <LinkContainer to={"/admin/dashboard"}>
            <Breadcrumb.Item componentClass="div">Database</Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item active
                           href="#">{`${props.relationship.mentor.firstName} & ${props.relationship.mentee.firstName}`}</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row>
        <Col md={3}>
          <h4>Mentor</h4>
          <ProfileIcon mentorMode pictureUrl={props.relationship.mentor.pictureUrl} size={"xl"}/>

          <LinkContainer to={`/admin/mentors/${props.relationship.mentor._id}`} style={{
            textDecoration: "underline", color: "blue",
            cursor: "pointer"
          }}>
            <h5>{props.relationship.mentor.firstName}</h5>
          </LinkContainer>
        </Col>
        <Col md={3}>
          <h4>Mentee</h4>
          <ProfileIcon pictureUrl={props.relationship.mentee.pictureUrl} size={"xl"}/>

          <LinkContainer to={`/admin/mentees/${props.relationship.mentee._id}`} style={{
            textDecoration: "underline", color: "blue",
            cursor: "pointer"
          }}>
            <h5>{props.relationship.mentee.firstName}</h5>
          </LinkContainer>
        </Col>
        <Col md={3}>
          <b>Status</b> <Badge variant={"info"}>{props.relationship.status}</Badge>
          <br/>
          <br/>
          {props.dashboard.showConfirmation ?
            <Row>
              <Col md={5}>
                <Button block variant='warning' onClick={props.toggleDashboardConfirmation}>Cancel</Button>
              </Col>
              <Col md={7}>
                <Button block variant='danger' onClick={() => props.cancelRelationship(props.relationship._id).then(r => {
                  if (r.success) toast.success("Relationship deleted");
                })}>Confirm</Button>
              </Col>
            </Row> : <Row>
              <Col>
                <Button block variant='danger' onClick={props.toggleDashboardConfirmation}>
                  Cancel relationship
                </Button>
              </Col>
            </Row>}
        </Col>
      </Row>
      <Row>
        <Col>
          <FeatureNotReadyYetOnHover>
            <h4>Upcoming meetings scheduled</h4>
            <CardDeck>
              <Card style={{ width: "200px" }}>
                <Card.Header>
                  <span>
                    <Icon name="fas fa-calendar"/> Friday 9th July
                  </span>
                </Card.Header>
              </Card>
              <Card style={{ width: "200px" }}>
                <Card.Header>
                  <span>
                    <Icon name="fas fa-calendar"/> Friday 23rd July
                  </span>
                </Card.Header>
              </Card>
            </CardDeck>
          </FeatureNotReadyYetOnHover>
        </Col>
      </Row>
    </Container> :
    <NotFound/>;
};

export default RelationshipAdminDetail;
