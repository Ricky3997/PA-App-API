import React, { Component } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import Dashboard from "./dashboard/Dashboard";
import { Route } from "react-router-dom";
import Matching from "./matching/Matching";
import { cancelRelationship, changeMenteeBeingMatched, toggleDashboardConfirmation } from "../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";
import { toast } from "react-toastify";
import BadgePendingNumber from "./utils/BadgePendingNumber";
import Statistics from "./statistics/Statistics";
import Database from "./utils/Database";
import { Icon } from "react-fa";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.changeTab = this.changeTab.bind(this);
  }

  componentDidMount() {
    if (!this.props.admin.fetched) {
      this.props.fetchMentors();
      this.props.fetchMentees();
      this.props.fetchRelationships();
    }
  }

  validateTab(tabKey) {
    return ["dashboard", "mentors", "mentees", "matching", "data"].indexOf(tabKey) > -1 ? tabKey : "dashboard";
  }

  refreshedToast(r, type) {
    if (r.success) toast.success("Refreshed " + type);
  }

  changeTab(key) {
    if (key === "refresh") {
      if (this.props.match.params.section === "mentors") this.props.fetchMentors().then(r => this.refreshedToast(r, "mentors"));
      else if (this.props.match.params.section === "mentees") this.props.fetchMentees().then(r => this.refreshedToast(r, "mentees"));
      else if (this.props.match.params.section === "matching" || this.props.match.params.section === "data") {
        this.props.fetchMentors();
        this.props.fetchMentees().then(r => this.refreshedToast(r, "mentors and mentees"));
      } else this.props.fetchRelationships().then(r => this.refreshedToast(r, "relationships"));
    } else this.props.history.push(`/admin/${key}`);
  }

  render() {
    const { section } = this.props.match.params;

    return (this.props.user && this.props.user.admin) ?
      <Container fluid>
        <Tabs style={{ marginBottom: "10px" }}
              activeKey={this.validateTab(section)}
              onSelect={this.changeTab}>
          <Tab eventKey="dashboard" title={<span><Icon name='fas fa-handshake-o'/>{"  Relationships   "}</span>}>
            <Route path={"/admin/dashboard/:id?"}
                   component={connect(({ admin, dashboard }) => {
                     return { relationships: admin.relationships, dashboard };
                   }, dispatch => {
                     return {
                       toggleDashboardConfirmation: () => dispatch(toggleDashboardConfirmation()),
                       cancelRelationship: (relationshipId) => dispatch(cancelRelationship(relationshipId))
                     };
                   })(Dashboard)}/>
          </Tab>
          <Tab eventKey="mentors" title={<span><Icon name='fas fa-graduation-cap'/>{"  Mentors   "}<BadgePendingNumber
            pending={this.props.admin.mentors.filter(m => m.status === "requested")}/></span>}>
            <Route path={"/admin/mentors/:id?"}
                   component={connect(({ admin }) => {
                     return { mentors: admin.mentors, mode: "mentors" };
                   }, null)(Database)}/>

          </Tab>
          <Tab eventKey="mentees" title={<span><Icon name='fas fa-user'/>{"  Mentees   "}<BadgePendingNumber
            pending={this.props.admin.mentees.filter(m => m.status === "requested")}/></span>}>
            <Route path={"/admin/mentees/:id?"}
                   component={connect(({ admin }) => {
                     return { mentees: admin.mentees, mode: "mentees" };
                   }, null)(Database)}/>
          </Tab>
          <Tab eventKey="matching" title={<span><Icon name='fas fa-bullseye'/>{"  Matching   "}<BadgePendingNumber
            pending={this.props.admin.mentees.filter(m => m.status === "approved" && !m.relationship)}/></span>}>
            <Route path={"/admin/matching/:id?"} component={connect(({ user, admin, matching }) => {
              return {
                user,
                mentors: admin.mentors.filter(m => m.status === "approved"),
                mentees: admin.mentees.filter(m => m.status === "approved" && !m.relationship),
                matching
              };
            }, dispatch => {
              return {
                changeMenteeBeingMatched: (id) => dispatch(changeMenteeBeingMatched(id))
              };
            })(Matching)}/>
          </Tab>
          <Tab eventKey="data" title={<span><Icon name='fas fa-bar-chart'/>{"  Statistics"}</span>}>
            <Route path={"/admin/data"} component={connect(({ user, admin }) => {
              return {
                user, mentors: admin.mentors, mentees: admin.mentees,
              };
            }, dispatch => {
              return {};
            })(Statistics)}/>
          </Tab>
          <Tab eventKey="refresh" disabled={this.props.fetching} title={<Icon name={"fas fa-refresh"}/>}/>
        </Tabs>
      </Container>
      : <div>Not Logged In</div>;
  }
}

export default Admin;
