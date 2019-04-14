import React from 'react';
import { Breadcrumb, Col, Container, Row } from 'react-bootstrap';
import { Icon } from 'react-fa';
import FeatureNotReadyYetOnHover from './FeatureNotReadyYetOnHover';
import NotReadyYet from './NotReadyYet';
import { LinkContainer } from 'react-router-bootstrap';
import * as qs from 'query-string';

const Search = ({match}) => {
  return <Container>
    <Row>
      <Col>
        <Breadcrumb>
          <LinkContainer to={''}>
            <Breadcrumb.Item>{"Home"}</Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item active href="#">Search: {match.params.query}</Breadcrumb.Item>
        </Breadcrumb>

        <FeatureNotReadyYetOnHover>
          <h3>Search</h3>
          <p>Searching results for.. {match.params.query}</p>
          <p>Knowledge Base content coming here soon!</p>
          <NotReadyYet/>
        </FeatureNotReadyYetOnHover>
      </Col>
    </Row>
  </Container>;
};

export default Search;
