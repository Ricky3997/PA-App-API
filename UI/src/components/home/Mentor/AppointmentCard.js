import React from 'react';
import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AppointmentCard = ({ purpose, date, mentee }) => {
  return (
    <Card style={{ maxWidth: '18rem', minWidth: '16rem' }}>
      <Card.Header>
        <Card.Title>{purpose}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Subtitle>{date}</Card.Subtitle>
        With {' '}
        <LinkContainer to={`/events/${mentee}`}>
          <Card.Link>{mentee}</Card.Link>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default AppointmentCard;
