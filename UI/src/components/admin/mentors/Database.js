import React, {Component} from 'react';
import {Col, Container, Form, Row, InputGroup, CardColumns} from "react-bootstrap";
import {Icon} from "react-fa";
import * as JsSearch from 'js-search';
import MentorCard from "./MentorCard";

class Database extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
        this.search = new JsSearch.Search('id');
        this.search.addIndex('firstName');
        this.search.addIndex('lastName');
        this.search.addIndex('university');
        this.search.addIndex('course');
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
                                                  onChange={e => this.setState({search: e.target.value})}/>
                                </InputGroup>
                            </Form.Group>

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
                            {mentorsToRender.map(m => <MentorCard {...m} changeSearch={(p) => this.setState({search: p})} />)}
                        </CardColumns>
                    </Col>
                </Row>
            </Container>
        );
    }

};


export default Database;