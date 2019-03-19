import React from "react";
import { Badge, Button, Card, Image, OverlayTrigger, ProgressBar, Tooltip } from "react-bootstrap";
import ConfirmMatchButton from "./ConfirmMatchButton";
import ProfileIcon from "../../various/ProfileIcon";
import connect from "react-redux/es/connect/connect";
import {
  confirmMatch,
  unsetMatchingConfirmation,
  showMatchingConfirmation,
  toggleMatchingDetailsModal
} from "../../../actions/actionCreator";
import { Link } from "react-router-dom";
import HoverForDetails from "../matching/HoverForDetails";
import countries from "svg-country-flags/countries";
import { LinkContainer } from "react-router-bootstrap";

const UserCard = (props) => {

  const ConfirmButton = connect(({ admin, matching }) => {
    return {
      fetching: admin.fetching,
      showConfirm: matching.showConfirm === props._id,
      menteeToMatch: props.menteeToMatch,
      mentorId: props._id
    };
  }, dispatch => {
    return {
      confirmMatch: (mentorId, menteeeId) => dispatch(confirmMatch(mentorId, menteeeId)).then(p => {
        if (p.success) props.successToast("Matched");
      }),
      showConfirmation: (id) => dispatch(showMatchingConfirmation(id)),
      unsetMatchingConfirmation: () => dispatch(unsetMatchingConfirmation())
    };
  })(ConfirmMatchButton);

  const ConnectedHoverForDetails = connect(({ matching }) => {
    return {
      mentor: { ...props },
      mentee: { ...props },
      mentorMode: props.mentorMode,
      matching
    };
  }, dispatch => {
    return {
      toggleMatchingDetailsModal: (id) => dispatch(toggleMatchingDetailsModal(id))
    };
  })(HoverForDetails);

  let flagIndex = "";
  Object.entries(countries).forEach((a) => {
    if (props.country === a[1]) flagIndex = a[0];
  });
  const flag = require(`svg-country-flags/svg/${flagIndex.toLowerCase()}.svg`);

  const MenteeCapacityBar = (current, capacity) => <ProgressBar style={current === 0 ? { color: "black" } : {}}
                                                                variant={(current === 0) ? "success" : (capacity - current) === 0 ? "danger" : ((capacity - current) === 1 ? "warning" : null)}
                                                                now={current - capacity === 0 ? 100 : (100 - (current / capacity * 100))}
                                                                label={`Mentees: ${current}/${capacity}`}/>;

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
        {props.matching && props.mentorMode ? <span>{"  "}<Badge style={{ fontSize: "20px" }}
                                                                 variant={props.score > 80 ? "success" : (props.score > 60 ? "warning" : "danger")}>{Math.floor(props.score)}%</Badge></span> : null}
      </Card.Header>
      <Card.Body>
        <Card.Title>
          <Image alt={props.country}
                 width="15px" src={flag}/>
          <span>{" "}</span>
          <OverlayTrigger placement="bottom" trigger="hover"
                          overlay={<Tooltip placement="bottom" className="in">Go to profile</Tooltip>}>
            <Link to={`/admin/${props.mentorMode ? "mentors" : "mentees"}/${props._id}`} style={{
              textDecoration: "underline", color: "blue",
              cursor: "pointer"
            }}>
              {`${props.firstName} ${props.lastName}`}
            </Link>
          </OverlayTrigger>


        </Card.Title>

        <ConnectedHoverForDetails/>

        {props.mentorMode ? MenteeCapacityBar(props.relationship.length, props.maxNumberOfMentees) : null}

      </Card.Body>
      {props.matching ?
        <Card.Footer>
          <ConfirmButton/>
        </Card.Footer> : null}
    </Card>
  );
};

export default UserCard;
