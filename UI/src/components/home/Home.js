import React from 'react';
import MentorHome from './MentorHome';
import MenteeHome from './MenteeHome';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Home = ({ user }) => {
  if (!user) return <Redirect to={'/onboard'}/>;
  else if (user.type === 'mentor') return <MentorHome user={user}/>;
  else return <MenteeHome user={user}/>;
};

export default withRouter(connect(({ user }) => {
  return { user };
}, dispatch => {
  return {};
})(Home));
