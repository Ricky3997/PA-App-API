import React from 'react';
import {Container, ProgressBar, Row} from "react-bootstrap";

const RelationshipTile = (props) => {
    return (<Container style={{backgroundColor: "", margin: "10px"}}>
            <Row>
                <img alt="Mentor avatar" src={props.mentor.pictureUrl} className="user-circle" style={{width: "50px", height: "50px"}}/>
                <img alt="Mentee avatar" src={props.mentee.pictureUrl} className="user-circle" style={{width: "50px", height: "50px", marginLeft: "-15px"}}/>
            </Row>
            <Row>
                <h6>
                {`${props.mentor.firstName} and ${props.mentee.firstName}`}
                </h6>
            </Row>
            <Row>
                <ProgressBar now={props.progress} label={`${props.progress}%`} style={{minWidth: "100px"}} />
            </Row>
        </Container>
    );
};

export default RelationshipTile;
