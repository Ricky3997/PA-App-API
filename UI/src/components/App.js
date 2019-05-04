import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../styles/App.scss';
import Header from './various/Header';
import Onboarding from './onboarding/Onboarding';
import Login from './various/Login';
import { Route, Switch } from 'react-router-dom';
import Confirm from './various/Confirm';
import MentorProfile from './home/Mentee/MentorTile';
import Call from './call/Call';
import Admin from './admin/Admin';
import Settings from './settings/Settings';
import JourneyModule from './journey/JourneyModule';
import Home from './home/Home';
import About from './various/About';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './various/Footer';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import PublicMentorProfile from './people/PublicMentorProfile';
import PublicMenteeProfile from './people/PublicMenteeProfile';
import Messages from './messaging/Messages';
import * as ReactGA from 'react-ga';
import moment from 'moment';
import GDPR from './various/GDPR';
import Search from './various/Search';
import Guides from './various/Guides';
import EventDetails from './various/EventDetails';
import Jobs from './jobs/Jobs';

class App extends Component {

  componentDidMount() {
    if (!this.props.app.trackingOn && this.props.user) ReactGA.set({ userId: this.props.user._id });
    if (window.location.host !== 'localhost:3000') this.props.history.listen((location) => {
      ReactGA.pageview(location.pathname);
    });
    if (moment().diff(moment(this.props.app.lastUserRefresh), 'm') >= 1) this.props.refreshUser();
  }

  render() {
    return (
      <div id="root_div">
        <Header/>
        <Container fluid id="root_container">
          <Switch>
            <Route path={'/login'} component={Login}/>
            <Route path={'/datapolicy'} component={GDPR}/>
            <Route path={'/Guides'} component={Guides}/>
            <Route path={'/search/:query'} component={Search}/>
            <Route path={'/settings'} component={Settings}/>
            <Route path={'/onboard'} component={Onboarding}/>
            <Route path={'/journey/:id'} component={JourneyModule}/>
            <Route path={'/mentor/:id'} component={PublicMentorProfile}/>
            <Route path={'/events/:id'} component={EventDetails}/>
            <Route path={'/jobs'} component={Jobs}/>
            <Route path={'/mentee/:id'} component={PublicMenteeProfile}/>
            <Route path={'/message'} component={Messages}/>
            <Route path={'/call'} component={Call}/>
            <Route path={'/mentor/:id'} exact component={MentorProfile}/>
            <Route path={'/about'} component={About}/>
            <Route path={'/confirm'} component={Confirm}/>
            <Route path={'/admin/:section?'} component={Admin}/>
            <Route component={Home}/>
          </Switch>
          <ToastContainer/>
        </Container>
        <Footer/>
      </div>
    );
  }
}

export default App;
