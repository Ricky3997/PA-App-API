import React, {Component} from 'react';
import {Container, Tabs, Tab} from "react-bootstrap";
import Dashboard from "./dashboard/Dashboard";
import Mentees from "./mentees/Mentees";
import Mentors from "./mentors/Mentors";
import {Route} from "react-router-dom";
import Matching from "./matching/Matching";
import * as api from "../api";

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mentors: [],
            relationships: [],
            mentees: []
        };
    }

    validateTab(tabKey){
        return ["dashboard","mentors", "mentees", "matching"].indexOf(tabKey) > -1 ? tabKey : "dashboard"
    }

    componentDidMount() {
        api.get("/api/mentors").then(r => {
            this.setState({mentors: r.payload});
        });
        api.get("/api/mentees").then(r => {
            this.setState({mentees: r.payload});
        }); api.get("/api/relationships").then(r => {
            this.setState({relationships: r.payload});
        });
    }


    render() {

        return (this.props.user && this.props.user.admin) ?
            <Container fluid>
                <Tabs style={{marginBottom: "10px"}}
                      activeKey={this.validateTab(this.props.match.params.section)}
                      onSelect={(key, event) => this.props.history.push(`/admin/${key}`)}>
                    <Tab eventKey="dashboard" title="Dashboard">
                        <Dashboard relationships={this.state.relationships}/>
                    </Tab>
                    <Tab eventKey="mentors" title="Mentors">
                        <Route path={"/admin/mentors/:section?"} render={(props) => <Mentors mentors={this.state.mentors} {...this.props} {...props}/>} />
                    </Tab>
                    <Tab eventKey="mentees" title="Mentees">
                        <Route path={"/admin/mentees/:section?"} render={(props) => <Mentees mentees={this.state.mentees} {...this.props} {...props}/>} />
                    </Tab>
                    <Tab eventKey="matching" title="Matching">
                        <Route path={"/admin/matching"} render={(props) => <Matching mentees={this.state.mentees.filter(m => m.status === "toMatch")} {...this.props} {...props}/>} />
                    </Tab>
                </Tabs>


            </Container>
        : <div>Not Logged In</div>;
    }

}

export default Admin;
