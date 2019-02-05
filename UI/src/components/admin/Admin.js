import React, { Component } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import Dashboard from "./dashboard/Dashboard";
import Mentees from "./mentees/Mentees";
import Mentors from "./mentors/Mentors";
import { Route } from "react-router-dom";
import Matching from "./matching/Matching";
import { Icon } from "react-fa";
import { adminChangeMentorStatus, setActiveMentorApprovalId } from "../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.changeTab = this.changeTab.bind(this);
  }

  componentDidMount() {
    this.props.fetchMentors();
  }

  validateTab(tabKey) {
    return ["dashboard", "mentors", "mentees", "matching"].indexOf(tabKey) > -1 ? tabKey : "dashboard";
  }

  changeTab(key) {
    if (key === "refresh" && this.props.match.params.section === "mentors") this.props.fetchMentors();
    else this.props.history.push(`/admin/${key}`);
  }

  render() {
    const { fetching } = this.props.admin;
    const { section } = this.props.match.params;

    return (this.props.user && this.props.user.admin) ?
      <Container fluid>
        <Tabs style={{ marginBottom: "10px" }}
              activeKey={this.validateTab(section)}
              onSelect={this.changeTab}>
          <Tab eventKey="dashboard" title="Dashboard">
            <Dashboard relationships={[]}/>
          </Tab>
          <Tab eventKey="mentors" title="Mentors">
            <Route path={"/admin/mentors/:section?"}
                   component={connect(({ user, admin, mentorAdmin }) => {
                     return { user, admin, mentorAdmin };
                   }, dispatch => {
                     return {
                       setActiveMentorApprovalId: (id) => dispatch(setActiveMentorApprovalId(id)),
                       adminChangeMentorStatus: (id,status) => dispatch(adminChangeMentorStatus(id,status))
                     };
                   })(Mentors)}/>

          </Tab>
          <Tab eventKey="mentees" title="Mentees">
            <Route path={"/admin/mentees/:section?"}
                   render={() => <Mentees mentees={[]}/>}/>
          </Tab>
          <Tab eventKey="matching" title="Matching">
            <Route path={"/admin/matching"} render={(props) => <Matching mentors={[]} mentees={[]}/>}/>
          </Tab>
          <Tab eventKey="refresh" disabled={fetching} title={<Icon name={"fas fa-refresh"}/>}/>
        </Tabs>


      </Container>
      : <div>Not Logged In</div>;
  }
}

export default Admin;
