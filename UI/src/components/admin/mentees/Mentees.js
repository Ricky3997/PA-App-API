import React from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import Database from "../utils/Database";
import Statistics from "../utils/Statistics";
import Approvals from "../utils/Approvals";
import BadgePendingNumber from "../utils/BadgePendingNumber";

const Mentees = (props) => {
  const validateSection = (section) => {
    return ["database", "approvals", "statistics"].indexOf(section) > -1 ? section : "database";
  };

  const filterForApproval = (mentees) => {
    return mentees.filter(m => m.status === "requested")
  };

  const { mentees } = props.admin;
  const { activeApprovalId } = props.menteeAdmin;
  return (
    <Row>
      <Col md={2}>
        <Nav variant="pills" className="flex-column" activeKey={validateSection(props.match.params.section)}
             onSelect={(key) => props.history.push(`/admin/mentees/${key}`)}>
          <Nav.Item>
            <Nav.Link eventKey="database">All Mentees</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="approvals"><span>{'Mentees Pending Approval '}<BadgePendingNumber pending={props.admin.mentees.filter(m => m.status === "requested")}/></span></Nav.Link>
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
              <Route path={"/admin/mentees/approvals/:id?"}
                     render={({ match }) => <Approvals activeApprovalId={activeApprovalId}
                                                       mentees={filterForApproval(mentees)}
                                                       mentorMode={false} match={match}
                                                       showModal={props.admin.showModal}
                                                       toggleAdminModal={props.toggleAdminModal}
                                                       changeStatus={props.changeStatus}
                                                       setActiveApprovalId={props.setActiveMenteeApprovalId}/>}/>
              <Route path={"/admin/mentees/statistics"} render={() => <Statistics mentees={mentees}/>}/>
              <Route path={"/admin/mentees/database/:id?"}
                     render={({ match, history }) => <Database history={history} id={match.params.id} mode="mentees"
                                                               mentees={mentees}/>}/>
            </Switch>
          </Tab.Pane>
        </Tab.Content>
      </Col>
    </Row>
  );
};

export default Mentees;
