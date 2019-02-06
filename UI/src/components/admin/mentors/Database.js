import React, { Component } from "react";
import { CardColumns, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Icon } from "react-fa";
import * as JsSearch from "js-search";
import * as _ from "lodash";
import MentorCard from "./MentorCard";

class Database extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      unisToSarch: ""
    };
    this.search = new JsSearch.Search("_id");
    this.search.addIndex("firstName");
    this.search.addIndex("university");
    this.search.addIndex("subject");
    this.search.addDocuments(props.mentors);
  }

  createListOfUnisToFilter(){
    return _.uniq(this.props.mentors.map(m=> m.university))
  }

  createListOfSubjectsToFilter(){
    return _.uniq(this.props.mentors.map(m=> m.subject))
  }

  render() {
    const mentorsToRender = this.state.search.length > 0 ? this.search.search(this.state.search) : this.props.mentors;
    return (
      <Container fluid>
        <Row>
          <Col md={3}>
            <Form>
              <Form.Group>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text><Icon name="fas fa-search"/></InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control placeholder="Search..." value={this.state.search}
                                onChange={e => this.setState({ search: e.target.value })}/>
                </InputGroup>
              </Form.Group>

              {/*TODO npm install --save react-bootstrap-typeahead*/}

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Control as="select">
                    <option>University</option>
                    {this.createListOfUnisToFilter().map(u => <option key={u} onClick={() => alert(u)}>{u}</option>)}
                  </Form.Control>
                </Form.Group>


                {/*TODO https://jedwatson.github.io/react-select/*/}

                <Form.Group as={Col}>
                  <Form.Control as="select">
                    <option>Course</option>
                    {this.createListOfSubjectsToFilter().map(u => <option key={u}>{u}</option>)}
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Group>
                <Form.Check type="checkbox" label="Include not free to mentor"/>
              </Form.Group>
            </Form>
          </Col>
          <Col md={9}>
            <CardColumns>
              {mentorsToRender.map(m => <MentorCard {...m} key={m._id} changeSearch={(p) => this.setState({ search: p })}/>)}
            </CardColumns>
          </Col>
        </Row>
      </Container>
    );
  }

};


export default Database;
