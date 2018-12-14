import React from "react";
import AnagraphicInfoStep from "./AnagraphicInfoStep";
import MenteeAcademicBackground from "./MenteeAcademicBackground";
import MenteeConfirm from "./MenteeConfirm";

const MenteeOnboarding = (props) => {
  return <div>
    {props.onboarding.step === 2 ? <AnagraphicInfoStep {...props} /> : null}
    {props.onboarding.step === 3 ? <MenteeAcademicBackground {...props} /> : null}
    {props.onboarding.step === 4 ? <MenteeConfirm {...props} /> : null}
  </div>

};

export default MenteeOnboarding;
