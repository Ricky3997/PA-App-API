import React from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import ConfirmMatchButton from "./ConfirmMatchButton";
import { Icon } from "react-fa";
import ProfileIcon from "../../various/ProfileIcon";
import connect from "react-redux/es/connect/connect";
import { confirmMatch, unsetMatchingConfirmation, showMatchingConfirmation } from "../../../actions/actionCreator";
import { Link } from "react-router-dom";

const UserCard = (props) => {

  const statusToIcon = () => {
    if (props.status === "notYetRequested") return <OverlayTrigger placement="bottom" overlay={<Tooltip placement="bottoom" className="in">Not Yet Requested</Tooltip>}>
      <Icon name={`fas fa-newspaper-o`} style={{ color: "#03619b" }}/>
    </OverlayTrigger>;
    else if (props.status === "approved") return <OverlayTrigger placement="bottom" overlay={<Tooltip placement="bottoom" className="in">Approved</Tooltip>}>
      <Icon name={`fas fa-check-circle`} style={{ color: "#289b00" }}/>
    </OverlayTrigger>;
    else if (props.status === "requested") return <OverlayTrigger placement="bottom" overlay={<Tooltip placement="bottoom" className="in">Pending Approval</Tooltip>}>
      <Icon name={`fas fa-hourglass`} style={{ color: "#c69200" }}/>
    </OverlayTrigger>;
    else if (props.status === "rejected") return <OverlayTrigger placement="bottom" overlay={<Tooltip placement="bottoom" className="in">Rejected</Tooltip>}>
      <Icon name={`fas fa-ban`} style={{ color: "#9b0014" }}/>
    </OverlayTrigger>;
    else return null;
  };

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

  return (
    <Card className="text-center" key={props._id}>
      <Card.Header>
        <ProfileIcon mentorMode={props.mentorMode} pictureUrl={props.pictureUrl} size={"m"}/>
      </Card.Header>
      <Card.Body>
        <Card.Title>
          <Link to={`/admin/${props.mentorMode ? "mentors" : "mentees"}/database/${props._id}`} style={{
            textDecoration: "underline", color: "blue",
            cursor: "pointer"
          }}>
            {props.firstName}
          </Link>
          <span>
            {" "}
            </span>
          <span>
            {statusToIcon()}
          </span>
        </Card.Title>
        {props.addFilterParam ?
          <Card.Text>
            {props.mentorMode ? <div>
               <span onClick={() => props.addFilterParam("subject", props.subject)}
                     style={{ color: "blue", cursor: "pointer" }}>{props.subject}</span>
                <span>{" at "}</span>
                <span onClick={() => props.addFilterParam("university", props.university)}
                      style={{ color: "blue", cursor: "pointer" }}>{props.university}</span>
                <div>
                  {`${props.relationship.length} mentee${props.relationship.length === 1 ? "" : "s"}; max ${props.maxNumberOfMentees}`}
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
          </Card.Text>
          : <Card.Text>
            {props.mentorMode ? <div>
              <div>
                {`${props.subject} at ${props.university}`}
              </div>
              <div>
                 {`${props.relationship.length} mentee${props.relationship.length === 1 ? "" : "s"}; max ${props.maxNumberOfMentees}`}
              </div>
            </div> : "mentee"}
          </Card.Text>}
      </Card.Body>
      {props.matching ?
        <Card.Footer>
          <ConfirmButton/>
        </Card.Footer> : null}
    </Card>
  );
};

export default UserCard;
