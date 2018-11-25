import React from 'react';
import {Col, Nav, Row,Tab} from "react-bootstrap";
import Database from "./Database";
import Approvals from "./Approvals";
import {Route} from "react-router-dom";
import Statistics from "./Statistics";

const Mentors = (props) => {
    return (
        <Row>
            <Col md={2}>
                <Nav variant="pills" className="flex-column" onSelect={(key,event) => props.history.push(`/admin/mentors/${key}`)}>
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
                    <Tab.Pane eventKey="database">
                        <Route path={["/admin/mentors/database", "/admin/mentors"]} render={(props) => <Database />} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="approvals">
                        <Route path={"/admin/mentors/approvals"} render={(props) => <Approvals />} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="statistics">
                        <Route path={"/admin/mentors/statistics"} render={(props) => <Statistics />} />
                    </Tab.Pane>
                </Tab.Content>
            </Col>
        </Row>
    );
};

export default Mentors;
