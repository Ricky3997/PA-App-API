import React, {Component} from 'react';
import {Col, Nav, Row, Tab} from "react-bootstrap";
import Database from "./Database";
import Approvals from "./Approvals";
import {Route, Switch} from "react-router-dom";
import Statistics from "./Statistics";
import * as api from "../../api";

class Mentors extends Component {
    constructor(props){
        super(props);
        this.state = {
            mentors: []
        };
    }

    componentDidMount() {
        api.get("/api/mentors").then(r => {
            this.setState({mentors: r.payload});
        });
    }

    validateSection (section) {
        return ["database", "approvals", "statistics"].indexOf(section) > -1 ? section : "database"
    };

    render() {
        return (
            <Row>
                <Col md={2}>
                    <Nav variant="pills" className="flex-column" activeKey={this.validateSection(this.props.match.params.section)}
                         onSelect={(key, event) => this.props.history.push(`/admin/mentors/${key}`)}>
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
                                <Route path={"/admin/mentors/approvals"} render={(props) => <Approvals mentors={this.state.mentors}/>}/>
                                <Route path={"/admin/mentors/statistics"} render={(props) => <Statistics mentors={this.state.mentors}/>}/>
                                <Route path={["/admin/mentors/database", "/admin/mentors"]}
                                       render={(props) => <Database mentors={this.state.mentors}/>}/>
                            </Switch>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        );
    }
};

export default Mentors;
