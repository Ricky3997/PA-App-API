import React from "react";
import { Card, Container, Image, ProgressBar, Row } from "react-bootstrap";
import ProfileIcon from "../../various/ProfileIcon";
import RelationshipAdminDetail from "../utils/RelationshipAdminDetail";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
    return (
      <Container>
          {props.match.params.id ? <RelationshipAdminDetail relationship={props.relationships.filter(r => r._id === props.match.params.id)[0]}/> : <Row>
              {props.relationships.length > 0 ?
                props.relationships.map(r => <Card key={r._id} className="text-center" style={{ margin: "10px" }}>
                    <Card.Header>
                        <ProfileIcon pictureUrl={r.mentor.pictureUrl} size={"m"} mentorMode/>
                        <ProfileIcon pictureUrl={r.mentee.pictureUrl} size={"m"} shiftLeft/>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                          <Link to={`/admin/dashboard/${r._id}`} style={{ textDecoration: 'underline', color: "blue", cursor: "pointer" }}>
                            {`${r.mentor.firstName} and ${r.mentee.firstName}`}
                          </Link>
                        </Card.Title>
                    </Card.Body>
                    <Card.Footer>
                        <ProgressBar now={r.progress} label={`${"TODO"}%`} style={{ minWidth: "100px" }}/>
                    </Card.Footer>
                </Card>) : <Container fluid>
                    <Image src={"https://media.giphy.com/media/6uGhT1O4sxpi8/giphy.gif"}/>
                </Container>
              }
          </Row>}
      </Container>
    );
};

export default Dashboard;
