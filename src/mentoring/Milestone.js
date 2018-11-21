import React from 'react';
import {Container} from "react-bootstrap";

const Milestone = (props) => {
    return (
        <Container>
            Milestone: {props.milestone.title}
            <br />
            Date: {props.milestone.date}
            <br />
            Description: {props.milestone.description}
        </Container>
    );
};

export default Milestone;
