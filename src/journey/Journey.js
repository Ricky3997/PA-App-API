import React, {Component} from 'react';
import {Breadcrumb, Col, Container, Row} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import JourneyModule from "./JourneyModule";
import JourneyHome from "./JourneyHome";

class Journey extends Component {
    render() {
          return  <Container fluid>
                <Row>
                    <Col>
                        <Breadcrumb>
                            <LinkContainer to="/journey">
                                <Breadcrumb.Item>Your Journey</Breadcrumb.Item>
                            </LinkContainer>
                            {this.props.match.params.id === undefined ? null :
                                <Breadcrumb.Item active>Module {this.props.match.params.id}</Breadcrumb.Item>
                            }
                        </Breadcrumb>
                    </Col>
                </Row>
              {this.props.match.params.id === undefined ?
                  <JourneyHome {...this.props} />:
                  <JourneyModule {...this.props} />
              }
            </Container>

    }
}

export default Journey;
