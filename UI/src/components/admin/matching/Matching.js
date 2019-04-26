import React, { Component } from 'react';
import { CardDeck, Col, Container, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import UserCard from '../utils/UserCard';
import { Icon } from 'react-fa';
import * as JsSearch from 'js-search';
import ProfileIcon from '../../various/ProfileIcon';
import { Field, Form as FormikForm, Formik } from 'formik';
import LoadingCard from '../utils/LoadingCard';
import { toast } from 'react-toastify';
import MenteeAdminProfile from '../utils/MenteeAdminProfile';
import NoMentorsFitCard from './NoMentorsFitCard';

class Matching extends Component {
  constructor(props) {
    super(props);
    this.search = new JsSearch.Search("_id");
    this.search.addIndex("firstName");
    this.search.addIndex("university");
    this.search.addIndex("subject");
    this.search.addDocuments(props.matching.mentorRecommendations);
  }

  componentDidMount() {
    if (this.props.match.params.id) this.props.changeMenteeBeingMatched(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.search.addDocuments(nextProps.matching.mentorRecommendations);
  }

  render() {
    const { activeId, mentorRecommendations } = this.props.matching;
    const { mentees, changeMenteeBeingMatched } = this.props;

    const toMatch = activeId ? mentees.filter(m => m._id === activeId)[0] : null;

    const successToast = (message) => toast.success(message);

    return (
      <Row>
        <Col md={2}>
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
        <Col md={10}>
          {toMatch ?
            <Container fluid>
              <Row>
                <Col>
                  <MenteeAdminProfile mentee={toMatch} matching/>
                </Col>
              </Row>
              <br/>
              <Row>
                <Col>
                  <h3>{"Match with a mentor:"}</h3>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Formik
                    initialValues={{ search: "" }}
                    render={({ values, setFieldValue }) => {

                      let mentorsToRender = values.search.length > 0 ? this.search.search(values.search) : mentorRecommendations;

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
                            {mentorRecommendations.length === 0
                              ? <CardDeck>
                                <LoadingCard/>
                                <LoadingCard/>
                                <LoadingCard/>
                              </CardDeck> :
                              mentorsToRender.length > 0 ? <CardDeck>
                                {mentorsToRender.sort((a, b) => Number(b.score) - Number(a.score)).map(m => <UserCard
                                  successToast={successToast}
                                  matching
                                  mentorMode
                                  key={m._id}
                                  menteeToMatch={toMatch._id} {...m}
                                />)}
                                <NoMentorsFitCard/>
                              </CardDeck> : <CardDeck>
                                <NoMentorsFitCard/>
                              </CardDeck>}
                          </div>
                        </FormikForm>
                      );
                    }}
                  />
                </Col>
              </Row>
            </Container> : <Container fluid>
              <h3>There are currently no mentees to match</h3>
            </Container>}
        </Col>
      </Row>
    );
  }
}

export default Matching;
