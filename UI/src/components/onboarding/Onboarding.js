import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import RegisterNewUser from './RegisterNewUser';
import MentorOnboarding from './MentorOnboarding';
import MenteeOnboarding from './MenteeOnboarding';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  addOnboardingProperties,
  changeStage,
  registerMentee,
  registerMentor,
  updateUser
} from '../../actions/actionCreator';


class Onboarding extends Component {

  componentDidMount() {
    if (this.props.user && this.props.onboarding.step === 1) this.props.changeStage(2);
  }

  render() {
    const { changeStage, updateUser, onboarding, user, addOnboardingProperties, registerMentor, history, registerMentee, location } = this.props;
    let step;
    if (!user) step =
      <RegisterNewUser user={user} updateUser={updateUser} changeStage={changeStage} history={history}
                       location={location}/>;
    else if (user.onboarded) step = <Redirect to="/"/>;
    else if (user.type === "mentor") step =
      <MentorOnboarding user={user} addOnboardingProperties={addOnboardingProperties} onboarding={onboarding}
                        changeStage={changeStage} registerMentor={registerMentor}/>;
    else if (user.type === "mentee") step =
      <MenteeOnboarding user={user} addOnboardingProperties={addOnboardingProperties} onboarding={onboarding}
                        changeStage={changeStage} registerMentee={registerMentee}/>;
    return (
      <div>
        <Container fluid className="onboarding">
          {step}
        </Container>
      </div>
    );
  }
}

export default connect(({ user, onboarding }) => {
  return { user, onboarding };
}, dispatch => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    changeStage: (change) => dispatch(changeStage(change)),
    addOnboardingProperties: (properties) => dispatch(addOnboardingProperties(properties)),
    registerMentor: () => dispatch(registerMentor()),
    registerMentee: () => dispatch(registerMentee())
  };
})(Onboarding);
