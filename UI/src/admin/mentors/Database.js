import React, {Component} from 'react';
import {Col, Container, Form, Row, InputGroup, Image, Card, CardColumns} from "react-bootstrap";
import {Icon} from "react-fa";
import * as JsSearch from 'js-search';

class Database extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            mentors: []
        };
        this.search = new JsSearch.Search('id');
        this.search.addIndex('firstName');
        this.search.addIndex('lastName');
        this.search.addIndex('university');
        this.search.addIndex('course');
    }

    componentDidMount() {
        fetch("/api/mentors/all").then(res => res.json()).then(mentors => {
            this.setState({mentors: mentors})
            this.search.addDocuments(mentors);
        });
    }

    render() {
        const mentorsToRender = this.state.search.length > 0 ? this.search.search(this.state.search) : this.state.mentors;
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
                            {mentorsToRender.map(m => {
                                return <Card className="text-center" key={m.id}>
                                        <Card.Header>
                                            <Image roundedCircle alt="Mentor avatar" src={m.pictureUrl}
                                                   style={{width: "70px"}}/>
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Title>
                                              {m.firstName}
                                            </Card.Title>
                                            <Card.Text>
                                                <span onClick={() => this.setState({search: m.course})} style={{color: "blue", cursor: "pointer"}}>{m.course}</span>
                                                <span>{" at "}</span>
                                                <span onClick={() => this.setState({search: m.university})} style={{color: "blue", cursor: "pointer"}}>{m.university}</span>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                            })}
                        </CardColumns>
                    </Col>
                </Row>
            </Container>
        );
    }

};


export default Database;
