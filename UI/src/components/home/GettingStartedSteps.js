import React from 'react';
import { Button, Col, Image, Row } from 'react-bootstrap';
import * as _ from 'lodash';
import { Bookmark, Timeline } from 'react-vertical-timeline';
import GettingStartedBox from './Mentor/GettingStartedBox';
import AcceptMenteeBox from './Mentor/AcceptMenteeBox';
import FeatureNotReadyYetOnHover from '../various/FeatureNotReadyYetOnHover';
import CountryPartner from '../advertising/CountryPartner';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { setGettingStartedStepsProgress, toggleApprovalModal } from '../../actions/actionCreator';
import RequestMentorApproval from './Mentor/RequestMentorApproval';
import RequestMenteeApproval from './Mentee/RequestMenteeApproval';
import ReferAFriend from '../various/ReferAFriend';
import PersonalityTestButton from './PersonalityTestButton';
import UploadProfilePictureButton from './UploadProfilePictureButton';

const GettingStartedSteps = (props) => {

  const onboardModule = {
    title: 'Register',
    description: 'Before we do anything, we need you to register with a couple of quick questions about who you are, where you\'re from and where you want to go!',
    ready: true,
    completed: props.user.onboarded
  };

  const confirmEmailModule = {
    title: 'First, confirm your email address',
    description: `First things first, we need you to confirm you can receive emails at ${props.user.email} 📧 Why? Because your email address is your only way to log in, we need to make sure you can come back! 🤓`,
    ready: props.user.onboarded,
    completed: props.user.emailConfirmed
  };

  const requestApprovallModule = {
    title: `Second, request approval to ${props.mode === 'mentor' ? 'mentor' : 'get a mentor'}`,
    description: `Awesome, thanks for that! Now, before we can match you with a ${props.mode === 'mentor' ? 'mentee' : 'mentor'}, we need to ask you some questions and check
     ${props.mode === 'mentor' ? 'everything is okay (we work with young students, so we have to be super careful!)' : 'you  meet the eligibility criteria'} 🔎`,
    ready: props.user.emailConfirmed,
    completed: props.user.onboarded && _.get(props.user, `${props.mode}Profile.status`) !== 'notYetRequested'
  };

  const waitUntilApproved = {
    title: 'Third, wait for approval',
    description: 'Fantastic, great that you\'ve submitted that request! Someone from the team will now look at it and let you know ASAP. While you wait, here are some things you can do in the mean time!',
    ready: props.user.emailConfirmed,
    completed: _.get(props.user, `${props.mode}Profile.status`) === 'approved'
  };

  const waitUntilMatched = {
    title: 'Fourth, wait until matched',
    description: `Whoho, you've been approved! We now need to find a ${props.mode === 'mentor' ? 'mentee' : 'mentor'} that matches your profile, so hang tight while we find one! In the mean time, here's some things you can do!`,
    ready: _.get(props.user, `${props.mode}Profile.status`) === 'approved',
    completed: props.mode === 'mentee' ?
      _.get(props.user, 'menteeProfile.relationship') :
      _.get(props.user, 'mentorProfile.relationship.length') > 0
  };


  const acceptMentee = {
    title: props.mode === 'mentee' ? 'Almost ready' : 'Start mentoring!',
    description: `Great news, you've been matched with a  ${props.mode === 'mentor' ? 'mentee' : 'mentor'}! 
    You're almost there,  ${props.mode === 'mentor' ? 'you just need to accept the match now' : 'we just  need your mentor to  confirm they have time'}, and you'll be ready to start!`,
    ready: props.mode === 'mentee' ?
      _.get(props.user, 'menteeProfile.relationship') :
      _.get(props.user, 'mentorProfile.relationship.length') > 0,
    completed: false
  };

  return (
    <div>
      <Row>
        <Col md={9}>
          <p>
            We are extremely excited to have you onboard with us! <br/> Before you can jump into the core of the action
            and
            {props.mode === 'mentee' ? ' get a mentor' : ' help a mentee ( the most rewarding and fun part!)'}, there's
            a couple of things for you to do! 🙏
          </p>
          <Row>
            <Col md={3}>
              <Timeline height={400} progress={props.gettingStartedSteps.progress}>
                <Bookmark key={'onboard'} progress={10} onSelect={() => props.setGettingStartedStepsProgress(10)}>
                  <h6
                    style={{ cursor: 'pointer' }}>{onboardModule.completed ? `✅ ` : '⏳'}{onboardModule.title}</h6>
                </Bookmark>
                <Bookmark key={'confirm'} progress={20} onSelect={() => props.setGettingStartedStepsProgress(20)}>
                  <h6
                    style={{ cursor: 'pointer' }}>{confirmEmailModule.completed ? `✅ ` : '⏳'}{confirmEmailModule.title}</h6>
                </Bookmark>
                <Bookmark key={'approval'} progress={40} onSelect={() => props.setGettingStartedStepsProgress(40)}>
                  <h6
                    style={{ cursor: 'pointer' }}>{requestApprovallModule.completed ? `✅ ` : '⏳'}{requestApprovallModule.title}</h6>
                </Bookmark>
                <Bookmark key={'waitApproval'} progress={60} onSelect={() => props.setGettingStartedStepsProgress(60)}>
                  <h6
                    style={{ cursor: 'pointer' }}>{waitUntilApproved.completed ? `✅ ` : '⏳'}{waitUntilApproved.title}</h6>
                </Bookmark>
                <Bookmark key={'waitMatch'} progress={80} onSelect={() => props.setGettingStartedStepsProgress(80)}>
                  <h6
                    style={{ cursor: 'pointer' }}>{waitUntilMatched.completed ? `✅ ` : '⏳'}{waitUntilMatched.title}</h6>
                </Bookmark>
                <Bookmark key={'mentee'} progress={100} onSelect={() => props.setGettingStartedStepsProgress(100)}>
                  <h6 style={{ cursor: 'pointer' }}>{acceptMentee.completed ? `✅ ` : '⏳'}{acceptMentee.title}</h6>
                </Bookmark>
              </Timeline>
            </Col>
            <Col md={9}>
              {props.gettingStartedSteps.progress === 10 ?
                <GettingStartedBox module={onboardModule} action={'Yes, let\'s register!'}
                                   onClick={() => props.history.push('/onboard')}/> : null}
              {props.gettingStartedSteps.progress === 20 ? <GettingStartedBox module={confirmEmailModule}
                                                                              action={'Open email'}
                                                                              onClick={() => window.open('https://' + props.user.email.substring(props.user.email.indexOf('@') + 1), '_blank')}
              /> : null}

              {props.gettingStartedSteps.progress === 40 && !props.gettingStartedSteps.showModal ?
                <GettingStartedBox module={requestApprovallModule} action={'Sure, let\'s do this!'}
                                   onClick={props.toggleApprovalModal}/> : null}

              {props.gettingStartedSteps.progress === 40 && props.mode === 'mentor' && _.get(props.user, 'mentorProfile') && props.gettingStartedSteps.showModal ?
                <RequestMentorApproval toggleApprovalModal={props.toggleApprovalModal}/> : null}

              {props.gettingStartedSteps.progress === 40 && props.mode === 'mentee' && _.get(props.user, 'menteeProfile') && props.gettingStartedSteps.showModal ?
                <RequestMenteeApproval toggleApprovalModal={props.toggleApprovalModal}/> : null}


              {props.gettingStartedSteps.progress === 60 ? <GettingStartedBox module={waitUntilApproved}/> : null}
              {props.gettingStartedSteps.progress === 80 ? <GettingStartedBox module={waitUntilMatched}/> : null}
              {props.gettingStartedSteps.progress === 100 ? <GettingStartedBox module={acceptMentee}/> : null}

              {(props.gettingStartedSteps.progress === 60 && waitUntilApproved.ready) ||
              (props.gettingStartedSteps.progress === 80 && waitUntilMatched.ready) ? <div>
                    <h5>
                      While you wait, you can {props.mode === 'mentee' ? 'get a head start by:' : 'help us with the following'}
                    </h5>
                    <ol>
                      <li style={{ marginBottom: '20px' }}>
                        <UploadProfilePictureButton mode={props.mode} user={props.user} />
                      </li>
                      <li style={{ marginBottom: '20px' }}>
                        <PersonalityTestButton personalityType={_.get(props.user, `${props.mode}Profile.personalityType`)} />
                      </li>
                      <li>
                        <FeatureNotReadyYetOnHover>
                          <Button disabled>Start the training</Button>
                        </FeatureNotReadyYetOnHover>
                      </li>
                    </ol>
                  </div> : null}

              {props.mode === 'mentor' && props.gettingStartedSteps.progress === 100 &&
              acceptMentee.ready ? props.user.mentorProfile.relationship.map(r =>
                <AcceptMenteeBox {...r} key={r._id} firstMatch/>) : null}
            </Col>
          </Row>
        </Col>
        <Col md={3}>
          <Row>
            <h4>
              Your {props.mode === 'mentee' ? 'Mentor' : 'Mentees'} <span role="img"
                                                                          aria-labelledby={'angel emoji'}>😇</span>
            </h4>
            <p>
              Soon you'll be able to {props.mode === 'mentee' ? 'get help from a mentor' : 'help your mentee(s)'}, just
              complete the steps on the left first!
            </p>
            <Image
              src='https://www.universitiesuk.ac.uk/news/PublishingImages/access-paper-blurred-students.png?RenditionID=8'
              height='130'/>
          </Row>
          <br/>
          <Row>
            <ReferAFriend mentorMode={props.mode === 'mentor'}/>
          </Row>
          <br/>

          <Row>
            <CountryPartner country={_.get(props.user, `${props.mode}Profile.country`)}
                            index={props.user._id.toLowerCase().split('').reduce((result, ch) =>
                              result * 16 + '0123456789abcdefgh'.indexOf(ch), 0) % 4}/>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default connect(({ user, gettingStartedSteps }) => {
  return { user, gettingStartedSteps };
}, dispatch => {
  return {
    setGettingStartedStepsProgress: (progress) => dispatch(setGettingStartedStepsProgress(progress)),
    toggleApprovalModal: () => dispatch(toggleApprovalModal())
  };
})(GettingStartedSteps);
