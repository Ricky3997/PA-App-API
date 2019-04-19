import React from 'react';
import { Breadcrumb, Col, Container, Row } from 'react-bootstrap';
import { Icon } from 'react-fa';
import FeatureNotReadyYetOnHover from './FeatureNotReadyYetOnHover';
import NotReadyYet from './NotReadyYet';
import { LinkContainer } from 'react-router-bootstrap';

const EventDetails = ({match}) => {
  return <Container>
    <Row>
      <Col>
        <Breadcrumb>
          <LinkContainer to={''}>
            <Breadcrumb.Item>{"Home"}</Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item active href="#">Event: {match.params.id}</Breadcrumb.Item>
        </Breadcrumb>
        <FeatureNotReadyYetOnHover>
        <h2>Event details!</h2>
          <p>Here soon for id {match.params.id}</p>
          <NotReadyYet/>
        </FeatureNotReadyYetOnHover>
      </Col>
    </Row>
  </Container>;
};

export default EventDetails;
