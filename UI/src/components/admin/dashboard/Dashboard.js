import React from "react";
import { Badge, Card, Container, Image, ProgressBar, Row } from "react-bootstrap";
import ProfileIcon from "../../various/ProfileIcon";
import RelationshipAdminDetail from "../utils/RelationshipAdminDetail";
import { Link } from "react-router-dom";
import moment from "moment";

const Dashboard = (props) => {
  return (
    <Container>
      {props.match.params.id ? <RelationshipAdminDetail dashboard={props.dashboard}
                                                        cancelRelationship={props.cancelRelationship}
                                                        toggleDashboardConfirmation={props.toggleDashboardConfirmation}
                                                        relationship={props.relationships.filter(r => r._id === props.match.params.id)[0]}/> :
        <Row>
          {props.relationships.length > 0 ?
            props.relationships.map(r => <Card key={r._id} className="text-center" style={{ margin: "10px" }}>
              <Card.Header>
                <ProfileIcon pictureUrl={r.mentor.pictureUrl} size={"m"} mentorMode/>
                <ProfileIcon pictureUrl={r.mentee.pictureUrl} size={"m"} shiftLeft/>
                {r.status === "awaitingConfirmation" ? <Badge variant={"warning"}>pending</Badge> : null}
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  <Link to={`/admin/dashboard/${r._id}`}
                        style={{ textDecoration: "underline", color: "blue", cursor: "pointer" }}>
                    {`${r.mentor.firstName} and ${r.mentee.firstName}`}
                  </Link>
                </Card.Title>
              </Card.Body>
              <Card.Footer>
                Matched on {moment(r.matchedOn).format("MMM do YY")}
                <ProgressBar now={r.progress} label={`${"TODO"}%`} style={{ minWidth: "100px" }}/>
              </Card.Footer>
            </Card>) : <Container fluid>
              <h4>No relationships at this time <span role={"img"} aria-labelledby={"sad crying emoji"}>😢</span></h4>
              <Image src={"https://media.giphy.com/media/6uGhT1O4sxpi8/giphy.gif"}/>
            </Container>
          }
        </Row>}
    </Container>
  );
};

export default Dashboard;
