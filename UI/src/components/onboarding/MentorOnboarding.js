import React from "react";
import AnagraphicInfoStep from "./AnagraphicInfoStep";
import MentorStep3 from "./MentorStep3";
import MentorStep4 from "./MentorStep4";

const MentorOnboarding = (props) => {
  return <div>
    {props.onboarding.step === 2 ? <AnagraphicInfoStep {...props} /> : null}
    {props.onboarding.step === 3 ? <MentorStep3 {...props} /> : null}
    {props.onboarding.step === 4 ? <MentorStep4 {...props} /> : null}
  </div>;
};

export default MentorOnboarding;
