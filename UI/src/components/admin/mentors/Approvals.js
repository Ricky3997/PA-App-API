import React, { Component } from "react";
import { Button, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import ProfileIcon from "../../various/ProfileIcon";

class Approvals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({ active: nextProps.mentors.length > 0 ? nextProps.mentors[0].id : null });
  }

  render() {
    const toApprove = this.state.active ? this.props.mentors.filter(m => m.id === this.state.active)[0] : null;
    return (
      <Container fluid>
        <Row>
          <Col md={3}>
            <ListGroup>
              {
                this.props.mentors.length > 0 ?
                  this.props.mentors.map(m => <ListGroup.Item active={this.state.active === m.id}
                                                              onClick={() => this.setState({ active: m.id })}
                                                              style={{ cursor: "pointer" }}>
                    <ProfileIcon pictureUrl={m.pictureUrl} size={"s"}/>
                    {`  ${m.firstName}`}
                  </ListGroup.Item>) :
                  <ListGroup.Item>
                    No Mentors to Approve
                  </ListGroup.Item>

              }
            </ListGroup>
          </Col>
          <Col md={9}>{toApprove ?
            <Container fluid>
              <Row>
                <Col md={3}>
                  <Image rounded alt="Mentor avatar" src={toApprove.pictureUrl} style={{ width: "150px" }}/>
                </Col>
                <Col md={9}>
                  <h6>{`${toApprove.firstName} ${toApprove.lastName}`}</h6>
                  <h6>{`${toApprove.course} at ${toApprove.university}`}</h6>
                  <h6>{`From ${toApprove.from}`}</h6>
                </Col>
              </Row>
              <Row>
                <Col md={{ size: 2, offset: 8 }}>
                  <Button block variant="danger"> Reject </Button>
                </Col>
                <Col md={{ size: 2 }}>
                  <Button block variant="success"> Approve </Button>
                </Col>
              </Row>
            </Container> : <div><h4>Nothing to approve</h4></div>}
          </Col>
        </Row>
      </Container>
    );
  }

};


export default Approvals;
