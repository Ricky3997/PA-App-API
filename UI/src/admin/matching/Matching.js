import React, {Component} from 'react';
import {Col, Container, Image, ListGroup, Row, CardDeck} from "react-bootstrap";
import MentorCard from "../mentors/MentorCard";
import * as _ from 'lodash';

class Matching extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: null
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({active: nextProps.mentees.length > 0 ? nextProps.mentees[0].id : null})
    }

    render() {
        const rand = _.random(0,this.props.mentors.length);
        const toMatch = this.state.active ? this.props.mentees.filter(m => m.id === this.state.active)[0] : null;
        return (
            <Row>
                <Col md={3}>
                    <ListGroup>
                        {this.props.mentees.length === 0 ? <ListGroup.Item active>No Mentees To Match</ListGroup.Item> : null}
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
                                    <Image rounded alt="Mentor avatar" src={toMatch.pictureUrl} style={{width: "150px"}}/>
                                </Col>
                                <Col md={10}>
                                    <h4>{`${toMatch.firstName}`}</h4>
                                    <h6>{`From ${toMatch.from}`}</h6>
                                    <h6>{`Studying at ${toMatch.school}`}</h6>
                                    <h6>{`Subjects: ${toMatch.subjectsInSchool.toString()}`}</h6>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col md={8}>
                                    <h5>Suggested Mentors:</h5>
                                    <CardDeck>
                                        {this.props.mentors.slice(rand, rand + 2).map(m => <MentorCard key={m.id} {...m} matching />)}
                                    </CardDeck>
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
