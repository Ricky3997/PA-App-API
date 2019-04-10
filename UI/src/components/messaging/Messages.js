import React from "react";
import * as _ from "lodash";
import Messaging from "./Messaging";

const Messages = (props) => {

  if (props.user.type === "mentor") {
    const rels = _.get(props.user, "mentorProfile.relationship");
    if (rels.length > 0 && _.some(rels, r => r.status === "confirmed")) return <Messaging {...props} />;
  } else if (props.user.type === "mentee") {
    const rel = _.get(props.user, "menteeProfile.relationship.status");
    if (rel.status === "confirmed") return <Messaging {...props} />;
  } else return <div>Messaging is only available once your mentoring relationship has started</div>;
};

export default Messages;