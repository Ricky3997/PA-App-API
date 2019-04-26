import React from 'react';
import { Badge, Card, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ConfirmMatchButton from './ConfirmMatchButton';
import ProfileIcon from '../../various/ProfileIcon';
import HoverForDetails from '../matching/HoverForDetails';
import RecommendationTransparency from '../matching/RecommendationTransparency';
import defaults from '../../../defaults/defaults';
import MenteeCapacityBar from './MenteeCapacityBar';

const UserCard = (props) => {
  return (
    <Card className="text-center" key={props._id}
          style={{ minWidth: "200px", maxWidth: "200px", marginBottom: "20px" }}>
      <Card.Header style={props.status === "requested" ? { backgroundColor: "#ffde89" } : {}}>
        <ProfileIcon mentorMode={props.mentorMode} pictureUrl={props.pictureUrl} size={"m"}/>

        {props.mentorMode ? (props.relationship.length > 0 ? props.relationship.map(r => <ProfileIcon
          key={r.mentee._id}
          pictureUrl={r.mentee.pictureUrl} size={"xs"}/>) : null) : (props.relationship ? <ProfileIcon
          pictureUrl={props.relationship.mentor.pictureUrl} mentorMode size={"xs"}/> : null)}

        {!props.matching && props.status === "requested" ?
          <Badge variant={"warning"}>pending approval</Badge> : null}
        {!props.matching && !props.mentorMode && !props.relationship && props.status === "approved" ?
          <Badge variant={"info"}>pending match</Badge> : null}

        {props.matching && props.mentorMode ? <span>{"  "}
          <OverlayTrigger placement="top" trigger="hover"
                          overlay={<Tooltip placement="bottom" className="in">
                            <RecommendationTransparency criteriaMatched={props.criteriaMatched}/>
                          </Tooltip>}>

        <Badge style={{ fontSize: "20px" }}
               variant={props.score > 80 ? "success" : (props.score > 60 ? "warning" : "danger")}>
          {Math.floor(props.score)}%</Badge>
          </OverlayTrigger>

        </span> : null}
      </Card.Header>
      <Card.Body>
        <Card.Title>
          <HoverForDetails mentor={{...props}} mentee={{...props}} mentorMode={props.mentorMode} matchingMode={props.matching} />
        </Card.Title>

        {props.mentorMode ? <Image
          src={[...defaults.universities.US, ...defaults.universities.UK].filter(u => u.name === props.university)[0].logo}
          style={{ maxHeight: "40px", maxWidth: "100px", marginBottom: '2px' }}/> : null}

        {props.mentorMode ? <MenteeCapacityBar current={props.relationship.length} capacity={props.maxNumberOfMentees} /> : null}

      </Card.Body>
      {props.matching ?
        <Card.Footer>
          <ConfirmMatchButton mentorId={props._id} menteeToMatch={props.menteeToMatch}/>
        </Card.Footer> : null}
    </Card>
  );
};

export default UserCard;
