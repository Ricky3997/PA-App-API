import React from "react";
import { Button, Col, Form, Image, InputGroup, Row } from "react-bootstrap";
import { Field, Form as FormikForm, Formik } from "formik";
import { Icon } from "react-fa";
import * as Yup from "yup";
import * as _ from "lodash";
import { Checkbox, Select } from "antd";
import defaults from "../../../defaults/defaults";
import SubjectsInSchoolPicker from "../../various/forms/SubjectsInSchoolPicker";
import UniversityPicker from "../../various/forms/UniversityPicker";
import CompulsoryAsterisk from "../CompulsoryAsterisk";
import { connect } from "react-redux";
import { changeMentorStatus } from "../../../actions/actionCreator";
import { toast } from "react-toastify";

const { Option } = Select;

const RequestMentorApproval = (props) => {
  const { showModal, ...initialValues } = props.mentorHome; //destrucutre props so you avoid passing down showModal to the values held in formik
  return <Formik
    validationSchema={Yup.object().shape({
      confirmCommittment: Yup.mixed().oneOf([true])
        .required("Commitment is required."),
      linkedinUrl: Yup.string(),
      ethnicBackground: Yup.string()
        .required("ethnicBackground is required."),
      typeOfHighSchool: Yup.string()
        .required("typeOfHighSchool is required."),
      fromThreeLargestCity: Yup.number()
        .required("fromThreeLargestCity is required."),
      subjectsInSchool: Yup.array()
        .required("subjectsInSchool required"),
      hobbiesAndInterests: Yup.array()
        .required("hobbiesAndInterests required"),
      careerInterests: Yup.array()
        .required("careerInterests required"),
      offersFromUnis: Yup.array()
        .required("offersFromUnis required"),
      yearBorn: Yup.number()
        .required("yearBorn is required."),
      referral: Yup.array()
        .required("referral required"),
      maxNumberOfMentees: Yup.number()
        .required("Max number of Mentees required"),
      notes: Yup.string()
    })}
    initialValues={{ confirmCommittment: false, ...initialValues }}
    render={({ values, touched, errors, isSubmitting, setFieldValue }) => (<FormikForm>
        <Row>
          <Col>
            <h4>
              Awesome, you're just a few questioons away from getting your mentee!
            </h4>
            <p>
              Before we can give you a mentee, we need to check some details and then find one that matches your profile
              to ensure they are the best possible match we can find: these questions help us do just that, thanks!
            </p>
          </Col>
        </Row>

        <br/>

        <Row>
          <Col>
            <h6>What's your ethnic background?<CompulsoryAsterisk/></h6>

            <Field name="ethnicBackground" render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                                     size={"large"}
                                                                                                     style={{ width: "100%" }}
                                                                                                     value={field.value}
                                                                                                     placeholder={"White, Black African, Mixed..."}
                                                                                                     onChange={(o) => setFieldValue(field.name, o)}
                                                                                                     tokenSeparators={[",", ":"]}>


              {defaults.ethnic_background.map(e => <Option key={e} value={e}>{e}</Option>)}

            </Select>}/>
          </Col>
          <Col>
            <h6>What year were you born?<CompulsoryAsterisk/> <span aria-labelledby={"newborn"}
                                                                    role={"img"}>🐣</span></h6>

            <Field name="yearBorn" render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                             size={"large"}
                                                                                             style={{ width: "100%" }}
                                                                                             value={field.value}
                                                                                             placeholder={"1991,1997...."}
                                                                                             onChange={(o) => setFieldValue(field.name, o)}
                                                                                             tokenSeparators={[",", ":"]}>


              {defaults.yearBorn.map(e => <Option key={e} value={e}>{e}</Option>)}

            </Select>}/>
          </Col>
        </Row>

        <br/>

        <Row>
          <Col>
            <h6>What type of high school did you attend?<CompulsoryAsterisk/> <span
              aria-labelledby={"school"} role={"img"}>🏫</span></h6>

            <Field name="typeOfHighSchool" render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                                     size={"large"}
                                                                                                     style={{ width: "100%" }}
                                                                                                     value={field.value}
                                                                                                     placeholder={"State selective, State non selective..."}
                                                                                                     onChange={(o) => setFieldValue(field.name, o)}
                                                                                                     tokenSeparators={[",", ":"]}>


              {defaults.school_type.map(e => <Option key={e} value={e}>{e}</Option>)}

            </Select>}/>
          </Col>
          <Col>
            <h6>Are you from one of the 3 largest cities in {props.user.mentorProfile.country}?<span
              style={{ color: "red" }}>*</span></h6>

            <Field name="fromThreeLargestCity" render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                                         size={"large"}
                                                                                                         style={{ width: "100%" }}
                                                                                                         value={field.value}
                                                                                                         placeholder={"Yes, No"}
                                                                                                         onChange={(o) => setFieldValue(field.name, o)}
                                                                                                         tokenSeparators={[",", ":"]}>


              <Option value={1}>Yes</Option>
              <Option value={0}>No</Option>

            </Select>}/>
          </Col>
        </Row>

        <br/>

        <Row>
          <Col>
            <h6>What subjects did you study in school?<CompulsoryAsterisk/></h6>

            <Field name="subjectsInSchool" render={({ field, form: { touched, errors } }) =>
              <SubjectsInSchoolPicker approval setFieldValue={setFieldValue} field={field} touched={touched}
                                      errors={errors} multiple/>}/>
          </Col>
          <Col>
            <h6>What are your hobbies?<CompulsoryAsterisk/></h6>

            <Field name="hobbiesAndInterests" render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                                        size={"large"}
                                                                                                        mode="tags"
                                                                                                        style={{ width: "100%" }}
                                                                                                        value={field.value}
                                                                                                        placeholder={"Painting, running.."}
                                                                                                        onChange={(o) => setFieldValue(field.name, o)}
                                                                                                        tokenSeparators={[",", ":"]}>


              {defaults.interests_and_hobbies.map(e => <Option key={e} value={e}>{e}</Option>)}

            </Select>}/>
          </Col>
        </Row>

        <br/>

        <Row>
          <Col>
            <h6>Do you have any career interests yet?<CompulsoryAsterisk/></h6>

            <Field name="careerInterests" render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                                    size={"large"}
                                                                                                    mode="multiple"
                                                                                                    style={{ width: "100%" }}
                                                                                                    value={field.value}
                                                                                                    placeholder={"Finance, engineering.."}
                                                                                                    onChange={(o) => setFieldValue(field.name, o)}
                                                                                                    tokenSeparators={[",", ":"]}>


              {defaults.career_interests.map(e => <Option key={e} value={e}>{e}</Option>)}

            </Select>}/>
          </Col>
          <Col>
            <h6>Do you want to link to your LinkedIn profile?</h6>

            <Field name="linkedinUrl"
                   render={({ field, form: { touched, errors } }) => <InputGroup className="md-6">
                     <InputGroup.Prepend>
                       <InputGroup.Text><Image
                         src={"http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c528.png"}
                         style={{ maxHeight: "16px" }}/></InputGroup.Text>
                     </InputGroup.Prepend>
                     <div>
                       <Form.Control {...field} placeholder="www.linkedin.com/in/amazingmentor"
                                     isInvalid={touched[field.name] && errors[field.name]}/>
                       {touched[field.name] && errors[field.name] ?
                         <p style={{ color: "red" }}>{errors[field.name]}</p> : null}
                     </div>
                   </InputGroup>}/>
          </Col>
        </Row>

        <br/>

        <Row>
          <Col>
            <h6>Congratulations on studying at {props.user.mentorProfile.university}! Besides that, what other
              universities did you successfully apply for?</h6>

            <Field name="offersFromUnis" render={({ field, form: { touched, errors } }) =>
              <UniversityPicker approval setFieldValue={setFieldValue} field={field} touched={touched} mentee
                                multiple errors={errors}/>}/>
          </Col>

        </Row>


        {/*Not convinced we need, but have to check:
            1) Phone Number
            2) Poste Code
            4) High school diploma in what system
            5) Funny fact about you
            5) What made you interested in this subject in particular? What parts interest you within your discipline? This is our chance to learn more about what you care about in an informal wa*
            */}

        <br/>

        <Row>
          <Col>
            <h6>How may mentees do you think you can help? It takes on average an hour per month</h6>

            <Field name="maxNumberOfMentees" render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                                       size={"large"}
                                                                                                       style={{ width: "100%" }}
                                                                                                       value={field.value}
                                                                                                       placeholder={"3"}
                                                                                                       onChange={(o) => setFieldValue(field.name, o)}
                                                                                                       tokenSeparators={[",", ":"]}>


              {[1, 2, 3, 4, 5, 6].map(e => <Option key={e} value={e}>{e}</Option>)}

            </Select>}/>
          </Col>
          <Col>
            <h6>Who referred you to us? Because we’d like to send them a thank you <span aria-labelledby={"gift"}
                                                                                         role={"img"}>🎁</span></h6>

            <Field name="referral" render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                             mode={"multiple"}
                                                                                             size={"large"}
                                                                                             style={{ width: "100%" }}
                                                                                             value={field.value}
                                                                                             placeholder={"Google, Instagram.."}
                                                                                             onChange={(o) => setFieldValue(field.name, o)}
                                                                                             tokenSeparators={[",", ":"]}>


              {defaults.referrer.map(e => <Option key={e} value={e}>{e}</Option>)}

            </Select>}/>
          </Col>
        </Row>

        <br/>

        <Row>
          <Col>
            <h6>Anything else you might want to add?</h6>

            <Field name="notes" render={({ field, form: { touched, errors } }) => <div>

              <Form.Control {...field} as="textarea" rows="3" placeholder="I also wanted to say that.."/>

            </div>
            }/>
          </Col>
        </Row>

        <br/>
        <Row>
          <Col>
            <Field name="committment" render={({ field, form: { touched, errors } }) => <span>
                  <Checkbox checked={values.confirmCommittment}
                            onChange={(e) => setFieldValue("confirmCommittment", e.target.checked)}/>
                  <b>{" I am happy to dedicate a couple of hours per month helping my mentee(s)"}</b>
                </span>
            }
            />
          </Col>
        </Row>
        <br/>

        <Row>
          <Col md={{ offset: 8 }}>
            <Button block onClick={() => props.changeMentorStatus("requested", values).then(r => {
              if (r.success) {
                props.toggleApprovalModal();
                toast.success("Request sent");
              } else toast.error("Error ");

            })} variant="success"
                    disabled={isSubmitting || !_.isEmpty(errors)}>
              <span>{"Let's go "} <Icon name="fas fa-arrow-right"/> </span>
            </Button>
          </Col>
        </Row>
      </FormikForm>
    )}/>;
};

export default connect(({ user, mentorHome }) => {
  return { user, mentorHome };
}, dispatch => {
  return {
    changeMentorStatus: (status, properties) => dispatch(changeMentorStatus(status, properties))
  };
})(RequestMentorApproval);
