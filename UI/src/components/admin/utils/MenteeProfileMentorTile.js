import { Badge, Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import React from "react";
import moment from "moment";
import ProfileIcon from "../../various/ProfileIcon";
import { LinkContainer } from "react-router-bootstrap";
import { Icon } from "react-fa";

const MenteeProfileMentorTile = ({ mentee, banned, mentor }) => {
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
      <OverlayTrigger placement="bottom" trigger="hover"
                      overlay={<Tooltip placement="bottom" className="in">Feature not ready yet</Tooltip>}>
            <span className="d-inline-block">
              <LinkContainer to="/message">
              <Button variant={"info"} disabled>Remove from blacklist</Button>
        </LinkContainer>
            </span>
      </OverlayTrigger>
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