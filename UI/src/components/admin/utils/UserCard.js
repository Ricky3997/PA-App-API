import React from "react";
import { Card, Image, ProgressBar } from "react-bootstrap";
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
import StatusIcon from "./StatusIcon";
import MentorMatchingDetailsModal from "../matching/MentorMatchingDetailsModal";
import countries from "svg-country-flags/countries";

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

  const ShowMentorMatchingDetailsModal = connect(({ matching }) => {
    return {
      mentor: { ...props },
      matching
    };
  }, dispatch => {
    return {
      toggleMatchingDetailsModal: (id) => dispatch(toggleMatchingDetailsModal(id))
    };
  })(MentorMatchingDetailsModal);

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
    <Card className="text-center" key={props._id}>
      <Card.Header>
        <ProfileIcon mentorMode={props.mentorMode} pictureUrl={props.pictureUrl} size={"m"}/>
        {props.mentorMode ? (props.relationship.length > 0 ? props.relationship.map(r => <ProfileIcon
          pictureUrl={r.mentee.pictureUrl} size={"xs"}/>) : null) : (props.relationship ? <ProfileIcon
          pictureUrl={props.relationship.mentor.pictureUrl} mentorMode size={"xs"}/> : null)}
      </Card.Header>
      <Card.Body>
        <Card.Title>
          <Image alt={props.country}
                 width="15px" src={flag}/>
          <span>{" "}</span>
          <Link to={`/admin/${props.mentorMode ? "mentors" : "mentees"}/database/${props._id}`} style={{
            textDecoration: "underline", color: "blue",
            cursor: "pointer"
          }}>{props.firstName}
          </Link>
          <span>
            {" "}
            </span>
          <span>
            <StatusIcon status={props.status} reason={props.rejectionReason}/>
          </span>
          {props.matching ? <ShowMentorMatchingDetailsModal/> : null}
        </Card.Title>
        {props.addFilterParam ?
          <div>
            {props.mentorMode ? <div>
               <span onClick={() => props.addFilterParam("subject", props.subject)}
                     style={{ color: "blue", cursor: "pointer" }}>{props.subject}</span>
                <span>{" at "}</span>
                <span onClick={() => props.addFilterParam("university", props.university)}
                      style={{ color: "blue", cursor: "pointer" }}>{props.university}</span>
                <div>
                  {MenteeCapacityBar(props.relationship.length, props.maxNumberOfMentees)}
                </div>
              </div> :
              <span>
              {props.interestedIn.map((s, i) => <span onClick={() => props.addFilterParam("subject", s)}
                                                      key={i}
                                                      style={{
                                                        color: "blue",
                                                        cursor: "pointer"
                                                      }}>{`${s}${i !== (props.interestedIn.length - 1) ? "," : ""} `}</span>)}

                <span>{" at "}</span>
                {props.unisApplyingFor.map((u, i) => <span onClick={() => props.addFilterParam("university", u)}
                                                           key={i}
                                                           style={{
                                                             color: "blue",
                                                             cursor: "pointer"
                                                           }}>{`${u}${i !== (props.unisApplyingFor.length - 1) ? "," : ""} `}</span>)}
            </span>
            }
          </div>
          : <div>
            {props.mentorMode ? <div>
              <div>
                {`${props.subject} at ${props.university}`}
              </div>
              <div>
                {MenteeCapacityBar(props.relationship.length, props.maxNumberOfMentees)}
              </div>
            </div> : "mentee"}
          </div>}
      </Card.Body>
      {props.matching ?
        <Card.Footer>
          <ConfirmButton/>
        </Card.Footer> : null}
    </Card>
  );
};

export default UserCard;
