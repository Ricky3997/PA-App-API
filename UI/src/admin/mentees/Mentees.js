import React from 'react';
import {Col, Nav, Row,Tab} from "react-bootstrap";

const Mentees = (props) => {
    return (
        <Row>
            <Col md={2}>
                <Nav variant="pills" className="flex-column" onSelect={(key,event) => props.history.push(`/admin/mentees/${key}`)}>
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
                        Database
                    </Tab.Pane>
                    <Tab.Pane eventKey="approvals">
                        Approvals
                    </Tab.Pane>
                    <Tab.Pane eventKey="statistics">
                        Statistics
                    </Tab.Pane>
                </Tab.Content>
            </Col>
        </Row>
    );
};

export default Mentees;
