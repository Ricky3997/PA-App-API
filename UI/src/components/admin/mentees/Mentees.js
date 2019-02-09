import React from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import Database from "../utils/Database";

const Mentees = (props) => {
    const validateSection = (section) => {
        return ["database", "approvals", "statistics"].indexOf(section) > -1 ? section : "database"
    };
    const { mentees } = props.admin;
    return (
        <Row>
            <Col md={2}>
                <Nav variant="pills" className="flex-column" activeKey={validateSection(props.match.params.section)}
                     onSelect={(key) => props.history.push(`/admin/mentees/${key}`)}>
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
                            <Route path={"/admin/mentees/approvals"} render={() => <div>{props.admin.mentees.length}</div>}/>
                            <Route path={"/admin/mentees/statistics"} render={() => <div>{props.admin.mentees.length}</div>}/>
                            <Route path={["/admin/mentees/database", "/admin/mentees/"]}
                                   render={() => <Database mode="mentees" mentees={mentees}/>}/>
                        </Switch>
                    </Tab.Pane>
                </Tab.Content>
            </Col>
        </Row>
    );
};

export default Mentees;
