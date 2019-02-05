import React from "react";
import { Card, Image } from "react-bootstrap";
import ConfirmMatchButton from "./ConfirmMatchButton";
import { Icon } from "react-fa";
import ProfileIcon from "../../various/ProfileIcon";
import ListGroup from "react-bootstrap/es/ListGroup";

const MentorCard = (props) => {

  const statusToIcon = () => {
    if (props.status === "notYetRequested") return  <Icon name={`fas fa-newspaper-o`} style={{ color: "#03619b" }}/>;
    else if (props.status === "approved") return <Icon name={`fas fa-check-circle`} style={{ color: "#289b00" }}/>;
    else if (props.status === "requested") return <Icon name={`fas fa-hourglass`} style={{ color: "#c69200" }}/>;
    else if (props.status === "rejected") return <Icon name={`fas fa-ban`} style={{ color: "#9b0014" }}/>;
    else return null;
  };

  return (
    <Card className="text-center" key={props.id}>
      <Card.Header>
        <ProfileIcon pictureUrl={props.pictureUrl} size={"m"}/>
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
        {props.changeSearch ?
          <Card.Text>
            <span onClick={() => props.changeSearch(props.subject)}
                  style={{ color: "blue", cursor: "pointer" }}>{props.subject}</span>
            <span>{" at "}</span>
            <span onClick={() => props.changeSearch(props.university)}
                  style={{ color: "blue", cursor: "pointer" }}>{props.university}</span>
          </Card.Text>
          : <Card.Text>
            {`${props.course} at ${props.university}`}
          </Card.Text>}
      </Card.Body>
      {props.matching ?
        <Card.Footer>
          <ConfirmMatchButton/>
        </Card.Footer> : null}
    </Card>
  );
};

export default MentorCard;
