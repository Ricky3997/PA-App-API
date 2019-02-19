import React, { Component } from "react";
import {
  CardColumns,
  Col,
  Container,
  Form, Image,
  InputGroup,
  Row
} from "react-bootstrap";
import { Icon } from "react-fa";
import * as JsSearch from "js-search";
import * as _ from "lodash";
import UserCard from "./UserCard";
import { Field, Form as FormikForm, Formik } from "formik";
import { Select } from "antd";
import MentorProfile from "../../people/MentorTile";
import connect from "react-redux/es/connect/connect";
import { confirmMatch, showMatchingConfirmation, unsetMatchingConfirmation } from "../../../actions/actionCreator";
import ConfirmMatchButton from "./ConfirmMatchButton";
import MentorAdminprofile from "./MentorAdminProfile";
import MenteeAdminProfile from "./MenteeAdminProfile";

const { Option } = Select;

class Database extends Component {
  constructor(props) {
    super(props);
    this.search = new JsSearch.Search("_id");
    this.search.addIndex("firstName");
    if (props.mode === "mentors") this.search.addIndex("university");
    if (props.mode === "mentors") this.search.addIndex("subject");
    this.search.addDocuments(props.mode === "mentors" ? props.mentors : props.mentees);
  }

  createListOfUnisToFilter(mentorMode) {
    if (mentorMode) return _.uniq(this.props.mentors.map(m => m.university));
    else return _.uniq(this.props.mentees.flatMap(m => m.unisApplyingFor));
  }

  createListOfSubjectsToFilter(mentorMode) {
    if (mentorMode) return _.uniq(this.props.mentors.map(m => m.subject));
    else return _.uniq(this.props.mentees.flatMap(m => m.interestedIn));
  }

  createListOfStatuses(mentorMode) {
    return _.uniq(this.props[mentorMode ? "mentors" : "mentees"].map(m => m.status));
  }

  render() {

    const ConnectedMentorProfile = connect(({ admin }) => {
      return { beadcrumbs: true, mentor: admin.mentors.filter(m => m._id === this.props.id)[0]};
    }, dispatch => {
      return {
      };
    })(MentorAdminprofile);

    const ConnectedMenteeProfile = connect(({ admin }) => {
      return { beadcrumbs: true, mentee: admin.mentees.filter(m => m._id === this.props.id)[0]};
    }, dispatch => {
      return {
      };
    })(MenteeAdminProfile);

    if(this.props.id && this.props.mode === "mentors") return <ConnectedMentorProfile />;
    else if(this.props.id) return <ConnectedMenteeProfile />;
    else return (
      <Formik
        render={({ values, setFieldValue }) => {
          const mentorMode = this.props.mode === "mentors";
          let toRender;

          toRender = (_.get(values, "search.length") > 0) ? this.search.search(values.search) : this.props[mentorMode ? "mentors" : "mentees"];

          if (_.get(values, "university.length") > 0) {
            toRender = toRender.filter(m => _.some(values.university, (u) => {
              return mentorMode ? m.university === u : _.some(m.unisApplyingFor, uAf => uAf === u);
            }));
          }
          if (_.get(values, "subject.length") > 0) {
            toRender = toRender.filter(m => _.some(values.subject, (s) => {
              return mentorMode ? m.subject === s : _.some(m.interestedIn, iI => iI === s);
            }));
          }

          if (_.get(values, "status.length") > 0) {
            toRender = toRender.filter(m => _.some(values.status, (u) => {
              return m.status === u;
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
                          {this.createListOfUnisToFilter(mentorMode).map((v) => <Option key={v} value={v}>{v}</Option>)}
                        </Select>;

                      }}
                    />

                    <br/>

                    <Field
                      type="select"
                      name="subject"
                      render={({ field }) => {
                        return <Select allowClear size={"large"}
                                       showSearch
                                       mode="tags"
                                       value={field.value}
                                       placeholder={"Subject"}
                                       onChange={(o) => setFieldValue(field.name, o)}>
                          {this.createListOfSubjectsToFilter(mentorMode).map((v) => <Option key={v}
                                                                                            value={v}>{v}</Option>)}
                        </Select>;

                      }}
                    />

                    <Field
                      type="select"
                      name="status"
                      render={({ field }) => {
                        return <Select allowClear size={"large"}
                                       showSearch
                                       mode="tags"
                                       value={field.value}
                                       placeholder={"Status"}
                                       onChange={(o) => setFieldValue(field.name, o)}>
                          {this.createListOfStatuses(mentorMode).map((v) => <Option key={v} value={v}>{v}</Option>)}
                        </Select>;

                      }}
                    />

                  </Col>
                  <Col md={9}>
                    <CardColumns>
                      {toRender.map(m => <UserCard history={this.props.history} mentorMode={mentorMode} {...m} key={m._id}
                                                   setFieldValue={setFieldValue}/>)}
                    </CardColumns>
                    {toRender.length === 0 && _.get(values, "search.length") > 0 ?
                      <div>
                        <h4>No results match your search <Icon name="fas fa-search"/>
                        </h4>
                        <Image src={"https://media.giphy.com/media/6uGhT1O4sxpi8/giphy.gif"}/>
                      </div> : null}
                  </Col>

                </Row>
              </Container>
            </FormikForm>
          );
        }}
      />

    );
  }

};


export default Database;
