import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

const JobCard = ({ title, dates, field, skills, link, coverUrl }) => {
  return <Card style={{ maxWidth: '14rem', minWidth: '14rem', marginBottom: '0.75rem' }}>
    <Card.Img variant="top"
              src={coverUrl}/>
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Subtitle>{dates}</Card.Subtitle>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroupItem>{field}</ListGroupItem>
      <ListGroupItem>{skills}</ListGroupItem>
    </ListGroup>
    <Card.Body>
      <a target='_blank'  rel="noopener noreferrer" href={link}>Find out more and apply</a>
    </Card.Body>
  </Card>;
};

export default JobCard;
