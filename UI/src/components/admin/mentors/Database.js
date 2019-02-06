import React, { Component } from "react";
import {
  CardColumns,
  Col,
  Container,
  Form,
  InputGroup,
  Row
} from "react-bootstrap";
import { Icon } from "react-fa";
import * as JsSearch from "js-search";
import * as _ from "lodash";
import MentorCard from "./MentorCard";
import { Field, Form as FormikForm, Formik } from "formik";
import { Select } from "antd";

const { Option } = Select;

class Database extends Component {
  constructor(props) {
    super(props);
    this.search = new JsSearch.Search("_id");
    this.search.addIndex("firstName");
    this.search.addIndex("university");
    this.search.addIndex("subject");
    this.search.addDocuments(props.mentors);
  }

  createListOfUnisToFilter() {
    return _.uniq(this.props.mentors.map(m => m.university));
  }

  createListOfSubjectsToFilter() {
    return _.uniq(this.props.mentors.map(m => m.subject));
  }

  render() {
    return (
      <Formik
        render={({ values, setFieldValue }) => {
          let mentorsToRender = (_.get(values, "search.length") > 0 ) ? this.search.search(values.search) : this.props.mentors;
          if(_.get(values, "university.length") > 0) {
            mentorsToRender = mentorsToRender.filter(m => _.some(values.university, (u) => {
              return m.university === u
            }));
          }
          if(_.get(values, "subject.length") > 0) {
            mentorsToRender = mentorsToRender.filter(m => _.some(values.subject, (u) => {
              return m.subject === u
            }));
          }

          return (
            <FormikForm>

              <Container fluid>
                <Row>
                  <Col md={3}>

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



                    <Field
                      type="select"
                      name="university"
                      render={({ field }) => {

                        return <Select allowClear size={"large"}
                                       showSearch
                                       mode="tags"
                                       value={field.value}
                                       placeholder={"University"}
                                       onChange={(o) => setFieldValue(field.name, o)}>
                          {this.createListOfUnisToFilter().map((v) => <Option key={v} value={v}>{v}</Option>)}
                        </Select>;

                      }}
                    />
                    <br/>

                    <Field
                      type="select"
                      name="subject"
                      render={({ field }) => {

                        return <Select allowClear   onChange={(o) => setFieldValue(field.name, o)}>
                          {this.createListOfSubjectsToFilter().map((v) => <Option key={v} value={v}>{v}</Option>)}
                        </Select>;

                      }}
                    />

                  </Col>
                  <Col md={9}>
                    <CardColumns>
                      {mentorsToRender.map(m => <MentorCard {...m} key={m._id}
                                                            setFieldValue={setFieldValue}/>)}
                    </CardColumns>
                  </Col>

                </Row>
              </Container>
            </FormikForm>
          )
        }}
      />

    );
  }

};


export default Database;
