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
import { Select } from "antd";
import CountryFlag from "../various/CountryFlag";
import defaults from '../../defaults/defaults';

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
    if(key === 'country') return;
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
    let {mentors, mentees, relationships, programFilter} = this.props.admin;


    if(programFilter !== 'Global'){
      mentors = mentors.filter(m => m.country === programFilter);
      mentees = mentees.filter(m => m.country === programFilter);
      relationships = relationships.filter(m => m.country === programFilter);
    }

    return (this.props.user && this.props.user.admin) ?
      <Container fluid>
        <Tabs style={{ marginBottom: "10px" }}
              activeKey={this.validateTab(section)}
              onSelect={this.changeTab}>
          <Tab eventKey="dashboard" title={<span><Icon name='fas fa-handshake-o'/>{"  Relationships   "}</span>}>
            <Route path={"/admin/dashboard/:id?"}
                   component={connect(({ dashboard }) => {
                     return { relationships, dashboard };
                   }, dispatch => {
                     return {
                       toggleDashboardConfirmation: () => dispatch(toggleDashboardConfirmation()),
                       cancelRelationship: (relationshipId) => dispatch(cancelRelationship(relationshipId))
                     };
                   })(Dashboard)}/>
          </Tab>
          <Tab eventKey="mentors" title={<span><Icon name='fas fa-graduation-cap'/>{"  Mentors   "}<BadgePendingNumber
            pending={mentors.filter(m => m.status === "requested")}/></span>}>
            <Route path={"/admin/mentors/:id?"}
                   component={connect(({}) => {
                     return { mentors, mode: "mentors" };
                   }, null)(Database)}/>

          </Tab>
          <Tab eventKey="mentees" title={<span><Icon name='fas fa-user'/>{"  Mentees   "}<BadgePendingNumber
            pending={mentees.filter(m => m.status === "requested")}/></span>}>
            <Route path={"/admin/mentees/:id?"}
                   component={connect(({}) => {
                     return { mentees, mode: "mentees" };
                   }, null)(Database)}/>
          </Tab>
          <Tab eventKey="matching" title={<span><Icon name='fas fa-bullseye'/>{"  Matching   "}<BadgePendingNumber
            pending={mentees.filter(m => m.status === "approved" && !m.relationship)}/></span>}>
            <Route path={"/admin/matching/:id?"} component={connect(({ user, matching }) => {
              return {
                user,
                mentors: mentors.filter(m => m.status === "approved"),
                mentees: mentees.filter(m => m.status === "approved" && !m.relationship),
                matching
              };
            }, dispatch => {
              return {
                changeMenteeBeingMatched: (id) => dispatch(changeMenteeBeingMatched(id))
              };
            })(Matching)}/>
          </Tab>
          <Tab eventKey="data" title={<span><Icon name='fas fa-bar-chart'/>{"  Statistics"}</span>}>
            <Route path={"/admin/data"} component={connect(({ user }) => {
              return {
                user, mentors, mentees, programFilter
              };
            }, dispatch => {
              return {};
            })(Statistics)}/>
          </Tab>
          <Tab eventKey="refresh" disabled={this.props.fetching} title={<Icon name={"fas fa-refresh"}/>}/>
          {this.props.user.admin === 'superadmin' ?<Tab eventKey="country" title={<Select showSearch
                                                 mode={"default"}
                                                 size={"small"}
                                                 style={{ width: "150px" }}
                                                 value={this.props.admin.programFilter}
                                                 onChange={this.props.setProgramFilter}
                                                 tokenSeparators={[",", ":"]}>

            <Select.Option value={'Global'}>🌍 Global</Select.Option>
            {defaults.countries_operating.map(c => <Select.Option value={c}><span><CountryFlag country={c}/>{' '}{c}</span></Select.Option>)}

          </Select>}/> : null}
        </Tabs>
      </Container>
      : <div>Not Logged In</div>;
  }
}

export default Admin;
