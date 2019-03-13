import React, { Component } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import Dashboard from "./dashboard/Dashboard";
import Mentees from "./mentees/Mentees";
import Mentors from "./mentors/Mentors";
import { Route } from "react-router-dom";
import Matching from "./matching/Matching";
import { Icon } from "react-fa";
import {
  adminChangeUserStatus, cancelRelationship,
  changeMenteeBeingMatched,
  setActiveMenteeApprovalId,
  setActiveMentorApprovalId, switchMatchingMode, toggleAdminModal, toggleDashboardConfirmation
} from "../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";
import { toast } from "react-toastify";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.changeTab = this.changeTab.bind(this);
  }

  componentDidMount() {
    if(!this.props.admin.fetched) {
      this.props.fetchMentors();
      this.props.fetchMentees();
      this.props.fetchRelationships();
    }
  }

  validateTab(tabKey) {
    return ["dashboard", "mentors", "mentees", "matching"].indexOf(tabKey) > -1 ? tabKey : "dashboard";
  }

  refreshedToast(r, type) {
    if(r.success) toast.success("Refreshed " + type);
  }

  changeTab(key) {
    if (key === "refresh") {
      if( this.props.match.params.section === "mentors") this.props.fetchMentors().then(r => this.refreshedToast(r, "mentors"));
      else if( this.props.match.params.section === "mentees") this.props.fetchMentees().then(r => this.refreshedToast(r, "mentees"));
      else if( this.props.match.params.section === "matching") {
        this.props.fetchMentors();
        this.props.fetchMentees().then(r => this.refreshedToast(r, "mentors and mentees"));
      }
      else this.props.fetchRelationships().then(r => this.refreshedToast(r, "relationships"));
    }
    else this.props.history.push(`/admin/${key}${(key === "mentors" || key === "mentees") ? "/database" : ""}`);

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
            <Route path={"/admin/dashboard/:id?"}
                   component={connect(({ admin, dashboard }) => {
                     return { relationships: admin.relationships, dashboard };
                   }, dispatch => {
                     return {
                       toggleDashboardConfirmation: () => dispatch(toggleDashboardConfirmation()),
                       cancelRelationship: (relationshipId) => dispatch(cancelRelationship(relationshipId)),
                     };
                   })(Dashboard)} />
          </Tab>
          <Tab eventKey="mentors" title="Mentors">
            <Route path={"/admin/mentors/:section?"}
                   component={connect(({ user, admin, mentorAdmin }) => {
                     return { user, admin, mentorAdmin };
                   }, dispatch => {
                     return {
                       setActiveMentorApprovalId: (id) => dispatch(setActiveMentorApprovalId(id)),
                       changeStatus: (id,status,rejectionReason) => dispatch(adminChangeUserStatus("mentor", id, status,rejectionReason)),
                       toggleAdminModal: () => dispatch(toggleAdminModal())
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
                       changeStatus: (id, status,rejectionReason) => dispatch(adminChangeUserStatus("meentee", id, status,rejectionReason)),
                       toggleAdminModal: () => dispatch(toggleAdminModal())
                     };
                   })(Mentees)}/>
          </Tab>
          <Tab eventKey="matching" title="Matching">
            <Route path={"/admin/matching/:id?"} component={connect(({ user, admin, matching }) => {
              return { user,
                mentors: admin.mentors.filter(m => m.status === "approved"),
                mentees: admin.mentees.filter(m => m.status === "approved" && !m.relationship),
                matching
              };
            }, dispatch => {
              return {
                switchMatchingMode: () => dispatch(switchMatchingMode()),
                changeMenteeBeingMatched: (id) => dispatch(changeMenteeBeingMatched(id)),
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
