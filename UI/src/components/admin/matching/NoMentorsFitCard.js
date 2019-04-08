import React from "react";
import { Card } from "react-bootstrap";

const NoMentorsFitCard = () => {

  return <Card style={{width: '200px'}}>
    <Card.Header>
      <Card.Title>
        No mentors fit this mentee?
      </Card.Title>
    </Card.Header>
    <Card.Body>
      Perhaps a mentor from a different country could be a good fit!
      <br/>
      Try asking a global admin on Slack!
    </Card.Body>
  </Card>
};


export default NoMentorsFitCard;
