import React from 'react';
import { Container } from 'react-bootstrap';
import ModuleBox from '../../journey/ModuleBox';

const Module = (props) => {
  return props.module ? (
    <Container>
      <h5>Milestone</h5>
      <p>{props.module.title}
      </p>
      <h5>Date</h5>
      <p>{props.module.date}</p>
      <h5>Description</h5>
      <p>{props.module.description}</p>
      <h5>Journey Module</h5>
      <ModuleBox module={props.module}/>
    </Container>
  ) : null;
};

export default Module;
