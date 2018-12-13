import React from "react";
import MentorStep2 from "./MentorStep2";
import MentorStep3 from "./MentorStep3";
import MentorStep4 from "./MentorStep4";

const MentorOnboarding = (props) => {
  return <div>
    {props.onboarding.step === 2 ? <MentorStep2 {...props} /> : null}
    {props.onboarding.step === 3 ? <MentorStep3 {...props} /> : null}
    {props.onboarding.step === 4 ? <MentorStep4 {...props} /> : null}
  </div>;
};

export default MentorOnboarding;
