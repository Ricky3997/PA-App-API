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
import * as _ from "lodash";
import { Icon } from "react-fa";
import * as JsSearch from "js-search";
import ProfileIcon from "../../various/ProfileIcon";
import { Field, Form as FormikForm, Formik } from "formik";

class Matching extends Component {
  constructor(props) {
    super(props);
    this.search = new JsSearch.Search("_id");
    this.search.addIndex("firstName");
    this.search.addIndex("university");
    this.search.addIndex("subject");
    this.search.addDocuments(props.mentors);
  }

  render() {

    const { activeId, manualMode } = this.props.matching;
    const { mentors, mentees, switchMatchingMode, setMatchingActiveId } = this.props;
    const rand = _.random(0, mentors.length - 3);
    const toMatch = activeId ? mentees.filter(m => m._id === activeId)[0] : null;

    return (
      <Row>
        <Col md={3}>
          <ListGroup>
            {mentees.length === 0 ?
              <ListGroup.Item active>No Mentees To Match</ListGroup.Item> : null}
            {mentees.map(m => <ListGroup.Item active={activeId === m._id}
                                              key={m._id}
                                              onClick={() => setMatchingActiveId(m._id)}
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
                <Col md={2}>
                  <ProfileIcon pictureUrl={toMatch.pictureUrl} size={"m"}/>
                </Col>
                <Col md={10}>
                  <h4>{`${toMatch.firstName}`}</h4>
                  <h6>{`From ${toMatch.city}`}</h6>
                  <h6>{`Studying at ${toMatch.school}`}</h6>
                  <h6>{`Subjects: ${toMatch.subjects.toString()}`}</h6>
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

                        const mentorsToRender = values.search.length > 0 ? this.search.search(values.search) : mentors;

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
                                {mentorsToRender.map(m => <UserCard {...m} key={m._id} matching mentorMode
                                                                    changeSearch={(p) => this.setState({ search: p })}/>)}
                              </CardColumns>

                            </div>
                          </FormikForm>
                        );
                      }}
                    /> :
                    <CardDeck>
                      {mentors.slice(rand, rand + 3).map(m => <UserCard mentorMode key={m._id} {...m} matching/>)}
                    </CardDeck>
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
