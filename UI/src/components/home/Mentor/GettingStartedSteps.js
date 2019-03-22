import React from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import * as _ from "lodash";
import { Bookmark, Timeline } from "react-vertical-timeline";
import RequestApprovalMentorModal from "./RequestApprovalMentorModal";
import GettingStartedBox from "./GettingStartedBox";
import AcceptMenteeBox from "./AcceptMenteeBox";
import ButtonNotReadyYet from "../../various/ButtonNotReadyYet";
import CountryPartner from "../../advertising/CountryPartner";


const GettingStartedSteps = (props) => {

  const onboardModule = {
    title: "Register",
    description: "Before we do anything, we need you to register with a couple of quick questions about who you are, where you're from and where you want to go!",
    ready: true,
    completed: props.user.onboarded
  };

  const confirmEmailModule = {
    title: "First, confirm your email address",
    description: "First things first, we need you to confirm your email address. Why? Because your email address is your only way to log in, we need to make sure you can come back! 📧",
    ready: props.user.onboarded,
    completed: props.user.emailConfirmed
  };

  const requestApprovallModule = {
    title: "Second, request approval to mentor",
    description: "Awesome, thanks for that! Now, before we can match you with a mentee, we need to ask you some questions and check everything is okay (we work with young students, so we have to be super careful!) 🔎",
    ready: props.user.emailConfirmed,
    completed: props.user.onboarded && _.get(props.user, "mentorProfile.status") !== "notYetRequested"
  };

  const waitUntilApproved = {
    title: "Third, wait for approval",
    description: "Fantastic, great that you've submitted that request! Someone from the team will now look at it and let you know ASAP. While you wait, here are some things you can do to help in the mean time!",
    ready: props.user.emailConfirmed,
    completed: _.get(props.user, "mentorProfile.status") === "approved"
  };

  const waitUntilMatched = {
    title: "Fourth, wait until matched",
    description: "Whoho, you've been approved! We now need to find a mentee that matches your profile, so hang tight while we find one! In the mean time, here's some things you can do to help!",
    ready: _.get(props.user, "mentorProfile.status") === "approved",
    completed: _.get(props.user, "mentorProfile.relationship.length") > 0
  };


  const acceptMentee = {
    title: "Start mentoring!",
    description: "Great news, you've been matched with a mentee! You're almost there, you just need to accept the match now, and you'll be ready to start!",
    ready: _.get(props.user, "mentorProfile.relationship.length") > 0,
    completed: false
  };

  return (
    <div>
      <Row>
        <Col md={9}>
          <p>
            We are extremely excited to have you onboard with us! <br/> Before you can jump into the core of the action
            and
            help a mentee ( the most rewarding and fun part!), there's a couple of things for you to do! 🙏
          </p>
          <Row>
            <Col md={3}>
              <Timeline height={400} progress={props.mentorHome.progress}>
                <Bookmark key={"onboard"} progress={10} onSelect={() => props.setMentorHomeProgress(10)}>
                  <h6
                    style={{ cursor: "pointer" }}>{onboardModule.completed ? `✅ ` : "⏳"}{onboardModule.title}</h6>
                </Bookmark>
                <Bookmark key={"confirm"} progress={20} onSelect={() => props.setMentorHomeProgress(20)}>
                  <h6
                    style={{ cursor: "pointer" }}>{confirmEmailModule.completed ? `✅ ` : "⏳"}{confirmEmailModule.title}</h6>
                </Bookmark>
                <Bookmark key={"approval"} progress={40} onSelect={() => props.setMentorHomeProgress(30)}>
                  <h6
                    style={{ cursor: "pointer" }}>{requestApprovallModule.completed ? `✅ ` : "⏳"}{requestApprovallModule.title}</h6>
                </Bookmark>
                <Bookmark key={"waitApproval"} progress={60} onSelect={() => props.setMentorHomeProgress(50)}>
                  <h6
                    style={{ cursor: "pointer" }}>{waitUntilApproved.completed ? `✅ ` : "⏳"}{waitUntilApproved.title}</h6>
                </Bookmark>
                <Bookmark key={"waitMatch"} progress={80} onSelect={() => props.setMentorHomeProgress(70)}>
                  <h6
                    style={{ cursor: "pointer" }}>{waitUntilMatched.completed ? `✅ ` : "⏳"}{waitUntilMatched.title}</h6>
                </Bookmark>
                <Bookmark key={"mentee"} progress={100} onSelect={() => props.setMentorHomeProgress(100)}>
                  <h6 style={{ cursor: "pointer" }}>{acceptMentee.completed ? `✅ ` : "⏳"}{acceptMentee.title}</h6>
                </Bookmark>
              </Timeline>
            </Col>
            <Col md={9}>
              {props.mentorHome.progress === 10 ?
                <GettingStartedBox module={onboardModule} action={"Yes, let's register!"}
                                   onClick={() => props.history.push("/onboard")}/> : null}
              {props.mentorHome.progress === 20 ? <GettingStartedBox module={confirmEmailModule}/> : null}
              {props.mentorHome.progress === 30 ?
                <GettingStartedBox module={requestApprovallModule} action={"Sure, let's do this!"}
                                   onClick={props.toggleMentorHomeModal}/> : null}
              {props.mentorHome.progress === 50 ? <GettingStartedBox module={waitUntilApproved}/> : null}
              {props.mentorHome.progress === 70 ? <GettingStartedBox module={waitUntilMatched}/> : null}
              {props.mentorHome.progress === 100 ? <GettingStartedBox module={acceptMentee}/> : null}

              {props.mentorHome.progress >= 50 && props.mentorHome.progress !== 100 && waitUntilApproved.ready ? <div>
                <h5>
                  While you wait, you can help us with the following
                </h5>
                <ol style={{ lineHeight: "50px" }}>
                  <li>
                    <ButtonNotReadyYet>
                      <Button disabled>Submit your personal statement</Button>
                    </ButtonNotReadyYet>
                  </li>
                  <li>
                    <ButtonNotReadyYet>
                      <Button disabled>Write a blog post</Button>
                    </ButtonNotReadyYet>
                  </li>
                  <li>
                    <ButtonNotReadyYet>
                      <Button disabled>Start the training</Button>
                    </ButtonNotReadyYet>
                  </li>
                </ol>
              </div> : null}

              {props.mentorHome.progress === 100 && acceptMentee.ready ? props.user.mentorProfile.relationship.map(r =>
                <AcceptMenteeBox {...r} key={r._id}/>) : null}

            </Col>
          </Row>
        </Col>
        <Col md={3}>
          <Row>
            <h4>
              Your Mentees <span role="img" aria-labelledby={"angel emoji"}>😇</span>
            </h4>
            <p>
              Soon you'll be able to help your mentee(s), just complete the steps on the left first!
            </p>
            <Image
              src='https://www.universitiesuk.ac.uk/news/PublishingImages/access-paper-blurred-students.png?RenditionID=8'
              height='130'/>
          </Row>
          <br/>

          <Row>
            <CountryPartner country={_.get(props.user, "mentorProfile.country")} index={Math.floor(Math.random() * 3)}/>
          </Row>
        </Col>
      </Row>

      {_.get(props.user, "mentorProfile") ?
        <RequestApprovalMentorModal user={props.user} show={props.mentorHome.showModal}
                                    mentorHome={props.mentorHome}
                                    onSubmit={(properties) => props.changeMentorStatus("requested", properties).then(r => {
                                      if (r.success) {
                                        props.toggleMentorHomeModal();
                                        toast.success("Request sent");
                                      } else toast.error("Error ");

                                    })
                                    }
                                    onHide={(properties) => {
                                      props.setMentorApprovalProperties(properties);
                                      props.toggleMentorHomeModal();
                                    }}/> : null}
    </div>
  );
};

export default GettingStartedSteps;
