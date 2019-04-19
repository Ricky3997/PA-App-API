import React from 'react';
import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const EventHappening = ({ coverUrl, date, description, title, id }) => {

  const maxLength = 60;

  return (
    <Card>
      <Card.Img src={coverUrl}/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="text-muted"> {date}</Card.Subtitle>
        <Card.Text>
          {description && description.length > maxLength ? description.substring(0, maxLength).concat('...') : description}
        </Card.Text>
        <LinkContainer to={`/events/${id}`}>
          <Card.Link href={`/events/${id}`}>Find out more</Card.Link>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default EventHappening;
