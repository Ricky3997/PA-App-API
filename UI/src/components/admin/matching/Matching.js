import React, { Component } from "react";
import {
  Button,
  CardColumns,
  CardDeck,
  Col,
  Container,
  Form,
  Image,
  InputGroup,
  ListGroup,
  Row
} from "react-bootstrap";
import MentorCard from "../utils/UserCard";
import * as _ from "lodash";
import { Icon } from "react-fa";
import * as JsSearch from "js-search";

class Matching extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: null,
            manualMode: false,
            search: ""
        };
        this.search = new JsSearch.Search('id');
        this.search.addIndex('firstName');
        this.search.addIndex('lastName');
        this.search.addIndex('university');
        this.search.addIndex('course');
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({active: nextProps.mentees.length > 0 ? nextProps.mentees[0].id : null})
        this.search.addDocuments(nextProps.mentors);
    }

    render() {
        const rand = _.random(0, this.props.mentors.length - 3);
        const toMatch = this.state.active ? this.props.mentees.filter(m => m.id === this.state.active)[0] : null;
        const mentorsToRender = this.state.search.length > 0 ? this.search.search(this.state.search) : this.props.mentors;
        return (
            <Row>
                <Col md={3}>
                    <ListGroup>
                        {this.props.mentees.length === 0 ?
                            <ListGroup.Item active>No Mentees To Match</ListGroup.Item> : null}
                        {this.props.mentees.map(m => <ListGroup.Item active={this.state.active === m.id}
                                                                     onClick={() => this.setState({active: m.id})}
                                                                     style={{cursor: "pointer"}}>
                                <Image roundedCircle alt="Mentee avatar" src={m.pictureUrl} style={{width: "30px"}}/>
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
                                    <Image rounded alt="Mentor avatar" src={toMatch.pictureUrl}
                                           style={{width: "150px"}}/>
                                </Col>
                                <Col md={10}>
                                    <h4>{`${toMatch.firstName}`}</h4>
                                    <h6>{`From ${toMatch.from}`}</h6>
                                    <h6>{`Studying at ${toMatch.school}`}</h6>
                                    <h6>{`Subjects: ${toMatch.subjectsInSchool.toString()}`}</h6>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col md={4}>
                                    <h5>{this.state.manualMode ? "Manual Matching" : "Top 3 Recommended Matches"}</h5>
                                </Col>
                                <Col md={4}>
                                    <Button variant="secondary" block
                                            onClick={() => this.setState({manualMode: !this.state.manualMode})}>
                                        {this.state.manualMode ?
                                            <span>Or See Automated Recommendations <Icon name="fas fa-magic"/></span>
                                            :
                                            <span> Or Manually Search for a Mentor <Icon name="fas fa-search"/></span>}
                                    </Button>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    {this.state.manualMode ? <div>
                                        <Form.Group>
                                            <InputGroup className="mb-3">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><Icon name="fas fa-search"/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control placeholder="Search..." value={this.state.search}
                                                              onChange={e => this.setState({search: e.target.value})}/>
                                            </InputGroup>
                                        </Form.Group>

                                        <CardColumns>
                                            {mentorsToRender.map(m => <MentorCard {...m} key={m.id} matching changeSearch={(p) => this.setState({search: p})}/>)}
                                        </CardColumns>

                                    </div> :
                                        <CardDeck>
                                            {this.props.mentors.slice(rand, rand + 3).map(m => <MentorCard
                                                key={m.id} {...m} matching />)}
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
