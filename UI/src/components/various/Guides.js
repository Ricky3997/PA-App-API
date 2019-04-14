import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import FeatureNotReadyYetOnHover from './FeatureNotReadyYetOnHover';
import NotReadyYet from './NotReadyYet';

const Guides = () => {
  return <Container>
    <Row>
      <Col>
        <FeatureNotReadyYetOnHover>
          <div>
            <h2>Guides</h2>
            <p>
              Coming soon, courtesy of InsideUni!
            </p>
          </div>
          <NotReadyYet/>
        </FeatureNotReadyYetOnHover>
      </Col>
    </Row>
  </Container>;
};

export default Guides;
