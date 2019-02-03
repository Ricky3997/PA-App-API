import React, { Component } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import Dashboard from "./dashboard/Dashboard";
import Mentees from "./mentees/Mentees";
import Mentors from "./mentors/Mentors";
import { Route } from "react-router-dom";
import Matching from "./matching/Matching";
import { Icon } from "react-fa";

class Admin extends Component {
  constructor(props){
    super(props);
    this.changeTab = this.changeTab.bind(this);
  }

  componentDidMount() {
    this.props.fetchMentors();
  }

  validateTab(tabKey) {
    return ["dashboard", "mentors", "mentees", "matching"].indexOf(tabKey) > -1 ? tabKey : "dashboard";
  }

  changeTab(key){
    if(key === "refresh") {
      const {section} = this.props.match.params;
      const {fetchMentors} = this.props;
      if(section === "mentors") fetchMentors();
    }
    else this.props.history.push(`/admin/${key}`);
  }

  render() {
    const {mentors, mentees, relationships, fetching} = this.props.admin;
    const {section} = this.props.match.params;

    return (this.props.user && this.props.user.admin) ?
      <Container fluid>
        <Tabs style={{ marginBottom: "10px" }}
              activeKey={this.validateTab(section)}
              onSelect={this.changeTab}>
          <Tab eventKey="dashboard" title="Dashboard">
            <Dashboard relationships={relationships}/>
          </Tab>
          <Tab eventKey="mentors" title="Mentors">
            <Route path={"/admin/mentors/:section?"}
                   render={(props) => <Mentors mentors={mentors} {...this.props} {...props}/>}/>
          </Tab>
          <Tab eventKey="mentees" title="Mentees">
            <Route path={"/admin/mentees/:section?"}
                   render={(props) => <Mentees mentees={mentees} {...this.props} {...props}/>}/>
          </Tab>
          <Tab eventKey="matching" title="Matching">
            <Route path={"/admin/matching"} render={(props) => <Matching mentors={mentors}
                                                                         mentees={mentees.filter(m => m.status === "toMatch")} {...this.props} {...props}/>}/>
          </Tab>
          <Tab eventKey="refresh" disabled={fetching} title={<Icon name={"fas fa-refresh"}/>}/>
        </Tabs>


      </Container>
      : <div>Not Logged In</div>;
  }

}

export default Admin;
