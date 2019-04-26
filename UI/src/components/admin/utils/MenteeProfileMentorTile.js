import { Badge, Button, Card } from 'react-bootstrap';
import React from 'react';
import moment from 'moment';
import ProfileIcon from '../../various/ProfileIcon';
import { LinkContainer } from 'react-router-bootstrap';
import { Icon } from 'react-fa';
import { toast } from 'react-toastify';

const MenteeProfileMentorTile = ({ mentee, banned, mentor, removeMentorFromBlacklist }) => {
  return banned ? <Card className="text-center" style={{ backgroundColor: "#a96b71", maxWidth: "18rem" }}>
    <Card.Header>
      <ProfileIcon pictureUrl={mentor.pictureUrl} size={"l"}/>
    </Card.Header>
    <Card.Body>
      <LinkContainer to={`/admin/mentors/${mentor._id}`}
                     style={{ cursor: "pointer", textDecoration: "underline", color: "blue" }}>
        <Card.Title>
          <Icon name='fas fa-ban' style={{ color: "#9b0014" }}/>
          {mentor.firstName}</Card.Title>
      </LinkContainer>
      <Button variant={"info"} onClick={() => removeMentorFromBlacklist(mentor._id).then(r => {
        if (r.success) toast.success(`${mentor.firstName} removed from blacklist`);
      })
      }>Remove from blacklist</Button>

    </Card.Body>
  </Card> : <Card className="text-center">
    <Card.Header>
      <ProfileIcon pictureUrl={mentee.relationship.mentor.pictureUrl} size={"l"}/>
      {mentee.relationship.status === "awaitingConfirmation" ?
        <Badge variant={"warning"}>pending</Badge> : null}
    </Card.Header>
    <Card.Body>
      <LinkContainer to={`/admin/mentors/${mentee.relationship.mentor._id}`}
                     style={{ cursor: "pointer", textDecoration: "underline", color: "blue" }}>
        <Card.Title>{mentee.relationship.mentor.firstName}</Card.Title>
      </LinkContainer>
      <Card.Text>
        Last message exchanged: TODO
      </Card.Text>
      <LinkContainer to={`/admin/dashboard/${mentee.relationship._id}`}
                     style={{ cursor: "pointer", textDecoration: "underline", color: "blue" }}>
        <Button variant={"light"}>Go to relationship</Button>
      </LinkContainer>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Matched
        on {moment(mentee.relationship.matchedOn).format("MMM Do YYYY")}</small>
    </Card.Footer>
  </Card>;
};

export default MenteeProfileMentorTile;