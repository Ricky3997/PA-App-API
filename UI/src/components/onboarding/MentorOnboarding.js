import React from 'react';
import AnagraphicInfoStep from './AnagraphicInfoStep';
import MentorAcademicBackground from './MentorAcademicBackground';
import MentorConfirm from './MentorConfirm';

const MentorOnboarding = (props) => {
  return <div>
    {props.onboarding.step === 2 ? <AnagraphicInfoStep {...props} /> : null}
    {props.onboarding.step === 3 ? <MentorAcademicBackground {...props} /> : null}
    {props.onboarding.step === 4 ? <MentorConfirm {...props} /> : null}
  </div>;
};

export default MentorOnboarding;
