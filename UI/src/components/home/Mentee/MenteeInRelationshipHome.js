import React from "react";
import { Col, Row } from "react-bootstrap";
import * as _ from "lodash";
import NoMentorYet from "./NoMentorYet";
import MentorTile from "./MentorTile";
import ProgressionTimeline from "./ProgressionTimeline";
import CountryPartner from "../../advertising/CountryPartner";
import Module from "./Module";
import { connect } from "react-redux";
import { changeActiveJourneyModule } from "../../../actions/actionCreator";

const MenteeInRelationshipHome = (props) => {
  return (
    <div>
      <Row>
        <Col md={9}>
          <p>
            It's always great to see you back with us, the world's your oyster!
          </p>
        </Col>
      </Row>

      <Row>
        <Col md={2}>
          {props.user.onboarded ?
            <ProgressionTimeline modules={props.user.menteeProfile.journey} activeId={props.journey.activeId}
                                 changeSection={(m) => props.changeActiveJourneyModule(m.typeformID)}/>
            : null}
        </Col>

        <Col md={7}>
          {props.user.onboarded ?
            <Module
              module={props.user.menteeProfile.journey.filter(m => m.typeformID === props.journey.activeId)[0]}/>
            : null}
        </Col>
        <Col md={3}>
          <Row>
            {_.get(props, "user.menteeProfile.relationship.status") === "confirmed" ?
              <MentorTile mentor={props.user.menteeProfile.relationship.mentor}/>
              : <NoMentorYet toggleMenteeHomeModal={props.toggleMenteeHomeModal}
                             changeMenteeStatus={props.changeMenteeStatus} user={props.user}/>}
          </Row>
          <br/>
          <Row>
            <CountryPartner country={props.user.menteeProfile.country} index={props.user._id.toLowerCase().split('').reduce( (result, ch) =>
              result * 16 + '0123456789abcdefgh'.indexOf(ch), 0) % 4}/>
          </Row>
        </Col>
      </Row>

    </div>
  );
};

export default connect(({ user, journey, menteeHome }) => {
  return { user, journey, menteeHome };
}, dispatch => {
  return {
    changeActiveJourneyModule: (id) => dispatch(changeActiveJourneyModule(id))
  };
})(MenteeInRelationshipHome);
