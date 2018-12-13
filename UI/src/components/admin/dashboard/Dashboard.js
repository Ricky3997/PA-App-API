import React from "react";
import { Card, Image, ProgressBar, Row } from "react-bootstrap";

const Dashboard = (props) => {
    return (
        <Row>
            {props.relationships.map(r => <Card key={r.id} className="text-center" style={{margin: "10px"}}>
                    <Card.Header>
                        <Image roundedCircle alt="Mentor avatar" src={r.mentor.pictureUrl}
                               style={{width: "50px", height: "50px"}}/>
                        <Image roundedCircle alt="Mentee avatar" src={r.mentee.pictureUrl}
                               style={{width: "50px", height: "50px", marginLeft: "-15px"}}/>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                            {`${r.mentor.firstName} and ${r.mentee.firstName}`}
                        </Card.Title>
                    </Card.Body>
                    <Card.Footer>
                        <ProgressBar now={r.progress} label={`${r.progress}%`} style={{minWidth: "100px"}}/>
                    </Card.Footer>
                </Card>)
            }
        </Row>
    );
};

export default Dashboard;
