import React from 'react';
import MentorHome from './MentorHome';
import MenteeHome from './MenteeHome';
import { Redirect } from 'react-router-dom';

const Home = ({ user, refreshUser, history }) => {
  if (!user) return <Redirect to={"/onboard"}/>;
  else if (user.type === "mentor") return <MentorHome user={user} refreshUser={refreshUser} history={history}/>;
  else return <MenteeHome user={user} refreshUser={refreshUser} history={history}/>;
};

export default Home;
