import React, { Component } from "react";
import { CardColumns, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Icon } from "react-fa";
import * as JsSearch from "js-search";
import MentorCard from "./MentorCard";

class Database extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
    this.search = new JsSearch.Search("id");
    this.search.addIndex("firstName");
    this.search.addIndex("lastName");
    this.search.addIndex("university");
    this.search.addIndex("course");
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.search.addDocuments(nextProps.mentors);
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
                    <option>Oxford</option>
                    <option>Cambridge</option>
                  </Form.Control>
                </Form.Group>


                {/*TODO https://jedwatson.github.io/react-select/*/}

                <Form.Group as={Col}>
                  <Form.Control as="select">
                    <option>Course</option>
                    <option>Computer Science</option>
                    <option>PPE</option>
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
              {mentorsToRender.map(m => <MentorCard {...m} changeSearch={(p) => this.setState({ search: p })}/>)}
            </CardColumns>
          </Col>
        </Row>
      </Container>

      //<Formik
      //     // validationSchema={} //TODO
      //     initialValues={{tags: ["React", "woow"]}}
      //     onSubmit={(values, { setSubmitting }) => {
      //       props.addOnboardingProperties(values);
      //       props.changeStage(3);
      //       setSubmitting(false);
      //
      //     }}
      //     render={({ values, touched, errors, isSubmitting, setFieldValue }) => (
      //       <FormikForm>
      //         <Field
      //           type="text"
      //           name="tags"
      //           render={({ field, form: { touched, errors } }) => {
      //             return <Select mode="tags"
      //                            style={{ width: "100%" }}
      //                            value={field.value}
      //                            placeholder="Tags Mode"
      //                            onChange={(o) => setFieldValue(field.name, o)}
      //                            tokenSeparators={[",", ":"]}>
      //               <OptGroup label="Manager">
      //                 <Option value="jack">Jack</Option>
      //                 <Option value="lucy">Lucy</Option>
      //               </OptGroup>
      //               <OptGroup label="Engineer">
      //                 <Option value="Yiminghe">yiminghe</Option>
      //               </OptGroup>
      //             </Select>;
      //           }}
      //         />
      //
      //       </FormikForm>
      //     )}
      //   />;
    );
  }

};


export default Database;
