import React from "react";
import { Select } from "antd";
import AnagraphicInfoStep from "./AnagraphicInfoStep";
import MenteeStep3 from "./MenteeStep3"
import MenteeStep4 from "./MenteeStep4";


const { Option, OptGroup } = Select;

const MenteeOnboarding = (props) => {
  return <div>
    {props.onboarding.step === 2 ? <AnagraphicInfoStep {...props} /> : null}
    {props.onboarding.step === 3 ? <MenteeStep3 {...props} /> : null}
    {props.onboarding.step === 4 ? <MenteeStep4 {...props} /> : null}
  </div>

};

export default MenteeOnboarding;
