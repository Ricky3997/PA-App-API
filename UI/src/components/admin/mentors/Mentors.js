import React, { Component } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import Database from "./../utils/Database";
import Approvals from "./../utils/Approvals";
import { Route, Switch } from "react-router-dom";
import Statistics from "./Statistics";

class Mentors extends Component {

    validateSection(section) {
        return ["database", "approvals", "statistics"].indexOf(section) > -1 ? section : "database"
    };

    filterForApproval(mentors) {
        return mentors.filter(m => m.status === "requested")
    }

    render() {
        const { mentors } = this.props.admin;
        const { activeApprovalId } = this.props.mentorAdmin;
        return (
          <Row>
              <Col md={2}>
                  <Nav variant="pills" className="flex-column"
                       activeKey={this.validateSection(this.props.match.params.section)}
                       onSelect={(key) => this.props.history.push(`/admin/mentors/${key}`)}>
                      <Nav.Item>
                          <Nav.Link eventKey="database">Database</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                          <Nav.Link eventKey="approvals">Approvals</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                          <Nav.Link eventKey="statistics">Statistics</Nav.Link>
                      </Nav.Item>
                  </Nav>
              </Col>
              <Col md={10}>
                  <Tab.Content>
                      <Tab.Pane active>
                          <Switch>
                              <Route path={"/admin/mentors/approvals"}
                                     render={() => <Approvals activeApprovalId={activeApprovalId}
                                                              mentors={this.filterForApproval(mentors)}
                                                              adminChangeMentorStatus={this.props.adminChangeMentorStatus}
                                                              setActiveMentorApprovalId={this.props.setActiveMentorApprovalId}/>}/>
                              <Route path={"/admin/mentors/statistics"}
                                     render={() => <Statistics mentors={mentors}/>}/>

                              <Route path={["/admin/mentors/database", "/admin/mentors"]}
                                     render={() => <Database mode="mentors" mentors={mentors}/>}/>
                          </Switch>
                      </Tab.Pane>
                  </Tab.Content>
              </Col>
          </Row>
        );
    }
};

export default Mentors;