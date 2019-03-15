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
import connect from "react-redux/es/connect/connect";
import MentorAdminprofile from "./MentorAdminProfile";
import MenteeAdminProfile from "./MenteeAdminProfile";
import UniversityPicker from "../../various/forms/UniversityPicker";
import { adminChangeUserStatus, toggleAdminModal } from "../../../actions/actionCreator";

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

  createListOfSubjectsToFilter(mentorMode) {
    if (mentorMode) return _.uniq(this.props.mentors.map(m => m.subject));
    else return _.uniq(this.props.mentees.flatMap(m => m.interestedIn));
  }

  createListOfStatuses(mentorMode) {
    return _.uniq(this.props[mentorMode ? "mentors" : "mentees"].map(m => m.status));
  }

  render() {

    const ConnectedMentorProfile = connect(({ admin }) => {
      return { beadcrumbs: true,
        showModal: admin.showModal,
        mentor: admin.mentors.filter(m => m._id === this.props.match.params.id)[0] };
    }, dispatch => {
      return {
        changeStatus: (id,status,rejectionReason) => dispatch(adminChangeUserStatus("mentor", id, status,rejectionReason)),
        toggleAdminModal: () => dispatch(toggleAdminModal())
      };
    })(MentorAdminprofile);

    const ConnectedMenteeProfile = connect(({ admin }) => {
      return { beadcrumbs: true,
        showModal: admin.showModal,
        mentee: admin.mentees.filter(m => m._id === this.props.match.params.id)[0], details: true};
    }, dispatch => {
      return {
        changeStatus: (id,status,rejectionReason) => dispatch(adminChangeUserStatus("mentee", id, status,rejectionReason)),
        toggleAdminModal: () => dispatch(toggleAdminModal())
      };
    })(MenteeAdminProfile);



    if (this.props.match.params.id && this.props.mode === "mentors") return <ConnectedMentorProfile/>;
    else if (this.props.match.params.id && this.props.mode === "mentees") return <ConnectedMenteeProfile/>;
    else return (
        <Formik
          render={({ values, touched, errors, isSubmitting, setFieldValue }) => {
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
                    <Col md={5}>
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
                    </Col>
                    <Col md={1}>
                      <h5><Icon name="fas fa-filter"/> {" Filter"}</h5>
                    </Col>
                    <Col md={2}>
                      <Field
                        type="select"
                        name="university"
                        render={({ field }) => {
                          return <UniversityPicker admin setFieldValue={setFieldValue} field={field} touched={touched}
                                                   errors={errors} multiple/>;
                        }}
                      />
                    </Col>
                    <Col  md={2}>
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
                    </Col>
                    <Col md={2}>
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
                  </Row>
                  <Row>
                    <Col md={12}>
                      <CardColumns>
                        {toRender.sort((a,b) => a.status === 'requested' ? (b.status ===  'requested' ? 0 : -1) : 1).map(m => <UserCard history={this.props.history} mentorMode={mentorMode} {...m}
                                                     key={m._id}
                                                     addFilterParam={(fieldName, param) => {
                                                       let newVals = [];
                                                       if (!values[fieldName]) newVals.push(param);
                                                       else if (values[fieldName].filter(f => f === param).length === 0) newVals = [...values[fieldName], param];
                                                       else return;
                                                       setFieldValue(fieldName, newVals);
                                                     }}/>)}
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
