import React from "react";
import { Card } from "react-bootstrap";
import ConfirmMatchButton from "./ConfirmMatchButton";
import { Icon } from "react-fa";
import ProfileIcon from "../../various/ProfileIcon";

const UserCard = (props) => {

  const statusToIcon = () => {
    if (props.status === "notYetRequested") return <Icon name={`fas fa-newspaper-o`} style={{ color: "#03619b" }}/>;
    else if (props.status === "approved") return <Icon name={`fas fa-check-circle`} style={{ color: "#289b00" }}/>;
    else if (props.status === "requested") return <Icon name={`fas fa-hourglass`} style={{ color: "#c69200" }}/>;
    else if (props.status === "rejected") return <Icon name={`fas fa-ban`} style={{ color: "#9b0014" }}/>;
    else return null;
  };

  return (
    <Card className="text-center" key={props._id}>
      <Card.Header>
        <ProfileIcon mentorMode={props.mentorMode} pictureUrl={props.pictureUrl} size={"m"}/>
      </Card.Header>
      <Card.Body>
        <Card.Title>
          <span>
            {props.firstName}
            </span>
          <span>
            {" "}
            </span>
          <span>
            {statusToIcon()}
          </span>
        </Card.Title>
        {props.setFieldValue ?
          <Card.Text>
            {props.mentorMode ? <span>
               <span onClick={() => props.setFieldValue("subject", [props.subject])}
                     style={{ color: "blue", cursor: "pointer" }}>{props.subject}</span>
            <span>{" at "}</span>
            <span onClick={() => props.setFieldValue("university", [props.university])}
                  style={{ color: "blue", cursor: "pointer" }}>{props.university}</span>
            </span> :
              <span>
              {props.interestedIn.map((s, i) => <span onClick={() => props.setFieldValue("subject", [s])}
                                                      style={{
                                                        color: "blue",
                                                        cursor: "pointer"
                                                      }}>{`${s}${i !== (props.interestedIn.length - 1) ? ',' : ''} `}</span>)}

                <span>{" at "}</span>
                {props.unisApplyingFor.map((u, i) => <span onClick={() => props.setFieldValue("university", [u])}
                                                           style={{
                                                             color: "blue",
                                                             cursor: "pointer"
                                                           }}>{`${u}${i !== (props.unisApplyingFor.length - 1) ? ',' : ''} `}</span>)}
            </span>}

          </Card.Text>
          : <Card.Text>
            {props.mentorMode ? `${props.subject} at ${props.university}` : "mentee"}
          </Card.Text>}
      </Card.Body>
      {props.matching ?
        <Card.Footer>
          <ConfirmMatchButton/>
        </Card.Footer> : null}
    </Card>
  );
};

export default UserCard;
