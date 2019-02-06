import React from "react";
import { Card, Container, ProgressBar, Row } from "react-bootstrap";
import ProfileIcon from "../../various/ProfileIcon";

const Dashboard = (props) => {
    return (
        <Row>
            {props.relationships.length > 0 ? props.relationships.map(r => <Card key={r._id} className="text-center" style={{margin: "10px"}}>
                    <Card.Header>
                        <ProfileIcon pictureUrl={r.mentor.pictureUrl} size={"m"}/>
                        <ProfileIcon pictureUrl={r.mentee.pictureUrl} size={"m"} shiftLeft/>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                            {`${r.mentor.firstName} and ${r.mentee.firstName}`}
                        </Card.Title>
                    </Card.Body>
                    <Card.Footer>
                        <ProgressBar now={r.progress} label={`${r.progress}%`} style={{minWidth: "100px"}}/>
                    </Card.Footer>
                </Card>) : <Container fluid><h5>No Relationships At This Time</h5></Container>
            }
        </Row>
    );
};

export default Dashboard;
