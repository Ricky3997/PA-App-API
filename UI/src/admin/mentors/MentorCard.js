import React from 'react';
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import ConfirmMatchButton from "./ConfirmMatchButton";

const MentorCard = (props) => {
    return (
        <Card className="text-center" key={props.id}>
            <Card.Header>
                <Image roundedCircle alt="Mentor avatar" src={props.pictureUrl}
                       style={{width: "70px"}}/>
            </Card.Header>
            <Card.Body>
                <Card.Title>
                    {props.firstName}
                </Card.Title>
                {props.changeSearch ?
                <Card.Text>
                    <span onClick={() => props.changeSearch(props.course)} style={{color: "blue", cursor: "pointer"}}>{props.course}</span>
                    <span>{" at "}</span>
                    <span onClick={() => props.changeSearch(props.university)} style={{color: "blue", cursor: "pointer"}}>{props.university}</span>
                </Card.Text>
                    : <Card.Text>
                        {`${props.course} at ${props.university}`}
                    </Card.Text> }
            </Card.Body>
            {props.matching ?
            <Card.Footer>
                <ConfirmMatchButton/>
            </Card.Footer> : null}
        </Card>
    );
};

export default MentorCard;
