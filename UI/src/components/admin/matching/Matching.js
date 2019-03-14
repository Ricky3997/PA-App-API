import React, { Component } from "react";
import {
  Button,
  CardColumns,
  CardDeck,
  Col,
  Container,
  Form,
  InputGroup,
  ListGroup,
  Row
} from "react-bootstrap";
import UserCard from "../utils/UserCard";
import { Icon } from "react-fa";
import * as JsSearch from "js-search";
import ProfileIcon from "../../various/ProfileIcon";
import { Field, Form as FormikForm, Formik } from "formik";
import LoadingCard from "../utils/LoadingCard";
import { toast } from "react-toastify";
import MenteeAdminProfile from "../utils/MenteeAdminProfile";

class Matching extends Component {
  constructor(props) {
    super(props);
    this.search = new JsSearch.Search("_id");
    this.search.addIndex("firstName");
    this.search.addIndex("university");
    this.search.addIndex("subject");
    this.search.addDocuments(props.mentors);
  }

  componentDidMount() {
    if (this.props.match.params.id) this.props.changeMenteeBeingMatched(this.props.match.params.id);
  }

  render() {
    const { activeId, manualMode, mentorRecommendations } = this.props.matching;
    const { mentors, mentees, switchMatchingMode, changeMenteeBeingMatched } = this.props;

    const toMatch = activeId ? mentees.filter(m => m._id === activeId)[0] : null;

    const successToast = (message) => toast.success(message);

    return (
      <Row>
        <Col md={3}>
          <h5>Mentees to match </h5>
          <ListGroup>
            {mentees.length === 0 ?
              <ListGroup.Item active>No Mentees To Match</ListGroup.Item> : null}
            {mentees.map(m => <ListGroup.Item active={activeId === m._id}
                                              key={m._id}
                                              onClick={() => (m._id !== activeId) ? changeMenteeBeingMatched(m._id) : null}
                                              style={{ cursor: "pointer" }}>
                <ProfileIcon pictureUrl={m.pictureUrl} size={"s"}/>
                {`  ${m.firstName}`}
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
        <Col md={9}>
          {toMatch ?
            <Container fluid>
              <Row>
                <Col>
                  <MenteeAdminProfile mentee={toMatch} matching/>
                </Col>
              </Row>
              <br/>
              <Row>
                <Col md={4}>
                  <h5>{manualMode ? "Manual Matching" : "Top 3 Recommended Matches"}</h5>
                </Col>
                <Col md={4}>
                  <Button variant="secondary" block
                          onClick={() => switchMatchingMode()}>
                    {manualMode ?
                      <span>Or See Automated Recommendations <Icon name="fas fa-magic"/></span>
                      :
                      <span> Or Manually Search for a Mentor <Icon name="fas fa-search"/></span>}
                  </Button>
                </Col>
              </Row>
              <br/>
              <Row>
                <Col>
                  {manualMode ? <Formik
                    initialValues={{ search: "" }}
                    render={({ values, setFieldValue }) => {

                      let mentorsToRender = values.search.length > 0 ? this.search.search(values.search) : mentors;
                      mentorsToRender = mentorsToRender.filter(m => m.relationship.length < m.maxNumberOfMentees); // Only allow matching if has capacity
                      if(toMatch.mentorBlackList.length > 0) mentorsToRender = mentorsToRender.filter(m => toMatch.mentorBlackList.map(me => me._id).indexOf(m._id) === -1);// Only allow matching if mentor not blacklisted

                      return (
                        <FormikForm>
                          <div>
                            <Field
                              type="select"
                              name="search"
                              render={({ field }) => {

                                return <InputGroup className="mb-3">
                                  <InputGroup.Prepend>
                                    <InputGroup.Text><Icon name="fas fa-search"/></InputGroup.Text>
                                  </InputGroup.Prepend>
                                  <Form.Control placeholder="Search..." value={field.search}
                                                onChange={(e) => setFieldValue(field.name, e.target.value)}/>
                                </InputGroup>;

                              }}
                            />
                            <CardColumns>
                              {mentorsToRender.map(m => <UserCard successToast={successToast} {...m} key={m._id} matching mentorMode
                                                                  menteeToMatch={toMatch._id} changeSearch={(p) => setFieldValue("search", p)}/>)}
                            </CardColumns>
                          </div>
                        </FormikForm>
                      );
                    }}
                  /> : <div>
                    {mentorRecommendations.length === 0
                      ? <CardDeck>
                        <LoadingCard/>
                        <LoadingCard/>
                        <LoadingCard/>
                      </CardDeck> :
                      <CardDeck>
                        {mentorRecommendations.map(m => <UserCard successToast={successToast} mentorMode key={m._id} menteeToMatch={toMatch._id} {...m} matching/>)}
                      </CardDeck>}
                  </div>
                  }
                  <br/>

                </Col>
              </Row>
            </Container> : <Container fluid>
              <h3>There are currently no mentees to match</h3>
            </Container>}
        </Col>
      </Row>
    );
  }
};

export default Matching;
