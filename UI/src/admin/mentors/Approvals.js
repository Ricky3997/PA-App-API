import React, {Component} from 'react';
import {Col, Container, Row, Image, ListGroup, Button} from "react-bootstrap";

class Approvals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: null,
            mentorsToApprove: []
        };
    }


    componentDidMount() {
        fetch("/api/mentors").then(res => res.json()).then(mentorsToApprove => {
            this.setState({mentorsToApprove: mentorsToApprove, active: mentorsToApprove.length > 0 ? mentorsToApprove[0].id : null})
        });
    }

    render() {
        const toApprove = this.state.active ? this.state.mentorsToApprove.filter(m => m.id === this.state.active)[0] : null;
        return (
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <ListGroup>
                            {this.state.mentorsToApprove.map(m => <ListGroup.Item active={this.state.active === m.id} onClick={() => this.setState({active: m.id})} style={{cursor: "pointer"}}>
                                <Image roundedCircle alt="Mentor avatar" src={m.pictureUrl}  style={{width: "30px"}}/>
                                    {`  ${m.firstName}`}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Col>
                    <Col md={9}>{toApprove ?
                        <Container fluid>
                            <Row>
                                <Col md={3}>
                                    <Image rounded alt="Mentor avatar" src={toApprove.pictureUrl} style={{width: "150px"}}/>
                                </Col>
                                <Col md={9}>
                                    <h6>{`${toApprove.firstName} ${toApprove.lastName}`}</h6>
                                    <h6>{`${toApprove.course} at ${toApprove.university}`}</h6>
                                    <h6>{`From ${toApprove.from}`}</h6>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{size:2, offset: 8}} >
                                    <Button block variant="danger"> Reject </Button>
                                </Col>
                                <Col md={{size:2}}>
                                    <Button block variant="success"> Approve </Button>
                                </Col>
                            </Row>
                        </Container> : null}
                    </Col>
                </Row>
            </Container>
        );
    }

};


export default Approvals;
