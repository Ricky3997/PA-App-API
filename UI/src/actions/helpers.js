import * as _ from 'lodash';

export const getInitialGettingStartedProgress = (user = JSON.parse(window.localStorage.getItem("user"))) => {
  try {
    let baseline = 0;
    if (user.onboarded) baseline = baseline + 10;
    if (user.emailConfirmed) baseline = baseline + 30;
    else baseline = baseline + 10;
    if (user[`${user.type}Profile`].status === "requested") baseline = baseline + 20;
    if (user[`${user.type}Profile`].status === "approved") baseline = baseline + 40;
    if (user.type === "mentor" ?
      _.get(user, "mentorProfile.relationship.length") > 0 :
      _.get(user, "menteeProfile.relationship")) baseline = 100;
    return baseline;
  } catch (e) {
    return 10;
  }
};