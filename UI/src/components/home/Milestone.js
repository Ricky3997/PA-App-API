import React from "react";
import { Container } from "react-bootstrap";
import ModuleBox from "../journey/ModuleBox";

const Milestone = (props) => {
    return (
        <Container>
            <h5>Milestone</h5>
            <p>{props.milestone.title}
            </p>
            <h5>Date</h5>
            <p>{props.milestone.date}</p>
            <h5>Description</h5>
            <p>{props.milestone.description}</p>
            <h5>Journey Module</h5>
            <ModuleBox milestone={props.milestone}/>
        </Container>
    );
};

export default Milestone;
