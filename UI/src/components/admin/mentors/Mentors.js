import React  from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import Database from "./../utils/Database";
import Approvals from "./../utils/Approvals";
import { Route, Switch } from "react-router-dom";
import Statistics from "./../utils/Statistics";

const Mentors = (props) => {

    const validateSection = (section) => {
        return ["database", "approvals", "statistics"].indexOf(section) > -1 ? section : "database"
    };

    const filterForApproval = (mentors) => {
        return mentors.filter(m => m.status === "requested")
    };

    const { mentors } = props.admin;
    const { activeApprovalId } = props.mentorAdmin;
    return (
      <Row>
          <Col md={2}>
              <Nav variant="pills" className="flex-column"
                   activeKey={validateSection(props.match.params.section)}
                   onSelect={(key) => props.history.push(`/admin/mentors/${key}`)}>
                  <Nav.Item>
                      <Nav.Link eventKey="database">All Mentors</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link eventKey="approvals">Mentors Pending Approval</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link eventKey="statistics">Data and Statistics</Nav.Link>
                  </Nav.Item>
              </Nav>
          </Col>
          <Col md={10}>
              <Tab.Content>
                  <Tab.Pane active>
                      <Switch>
                          <Route path={"/admin/mentors/approvals"}
                                 render={() => <Approvals activeApprovalId={activeApprovalId}
                                                          mentors={filterForApproval(mentors)}
                                                          mentorMode
                                                          adminChangeUserStatus={props.adminChangeUserStatus}
                                                          setActiveApprovalId={props.setActiveMentorApprovalId}/>}/>
                          <Route path={"/admin/mentors/statistics"}
                                 render={() => <Statistics mentorMode mentors={mentors}/>}/>

                          <Route path={"/admin/mentors/database/:id?"}
                                 render={({match, history}) => <Database history={history} id={match.params.id} match={match} mode="mentors" mentors={mentors}/>}/>
                      </Switch>
                  </Tab.Pane>
              </Tab.Content>
          </Col>
      </Row>
    );

};

export default Mentors;