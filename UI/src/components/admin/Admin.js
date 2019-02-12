import React, { Component } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import Dashboard from "./dashboard/Dashboard";
import Mentees from "./mentees/Mentees";
import Mentors from "./mentors/Mentors";
import { Route } from "react-router-dom";
import Matching from "./matching/Matching";
import { Icon } from "react-fa";
import {
  adminChangeUserStatus,
  setActiveMenteeApprovalId,
  setActiveMentorApprovalId, setMatchingActiveId, switchMatchingMode
} from "../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.changeTab = this.changeTab.bind(this);
  }

  componentDidMount() {
    if(!this.props.admin.fetched) {
      this.props.fetchMentors();
      this.props.fetchMentees();
    }
  }

  validateTab(tabKey) {
    return ["dashboard", "mentors", "mentees", "matching"].indexOf(tabKey) > -1 ? tabKey : "dashboard";
  }

  changeTab(key) {
    if (key === "refresh") {
      if( this.props.match.params.section === "mentors") this.props.fetchMentors();
      if( this.props.match.params.section === "mentees") this.props.fetchMentees();
    }
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
                       adminChangeUserStatus: (id,status, type) => dispatch(adminChangeUserStatus(id,status, type))
                     };
                   })(Mentors)}/>

          </Tab>
          <Tab eventKey="mentees" title="Mentees">
            <Route path={"/admin/mentees/:section?"}
                   component={connect(({ user, admin, menteeAdmin }) => {
                     return { user, admin, menteeAdmin };
                   }, dispatch => {
                     return {
                       setActiveMenteeApprovalId: (id) => dispatch(setActiveMenteeApprovalId(id)),
                       adminChangeUserStatus: (id,status, type) => dispatch(adminChangeUserStatus(id,status, type))
                     };
                   })(Mentees)}/>
          </Tab>
          <Tab eventKey="matching" title="Matching">
            <Route path={"/admin/matching"} component={connect(({ user, admin, matching }) => {
              return { user,
                mentors: admin.mentors.filter(m => m.status = "approved"),
                mentees: admin.mentees.filter(m => m.status = "approved"),
                matching
              };
            }, dispatch => {
              return {
                switchMatchingMode: () => dispatch(switchMatchingMode()),
                setMatchingActiveId: (id) => dispatch(setMatchingActiveId(id)),
              };
            })(Matching)}/>


          </Tab>
          <Tab eventKey="refresh" disabled={fetching} title={<Icon name={"fas fa-refresh"}/>}/>
        </Tabs>


      </Container>
      : <div>Not Logged In</div>;
  }
}

export default Admin;
