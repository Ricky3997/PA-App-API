import React, {Component} from 'react';
import {Breadcrumb, Col, Container, Row} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import JourneyModule from "./JourneyModule";
import JourneyHome from "./JourneyHome";

class Journey extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modules: [
                {
                    id: 1,
                    title: "Getting Started with your Mentor",
                    description: "In this module, you'll learn how to get started",
                    completed: true,
                    ready: true,
                    typeformID: "MDHUre"
                },
                {
                    id: 2,
                    title: "Subject Choice: How to orient yourself",
                    description: "Choosing your subject can be daunting, here we'll give you a couple tips",
                    completed: true,
                    ready: true,
                    typeformID: "MDHUre"
                },
                {
                    id: 3,
                    title: "Writing your Personal Statetement",
                    description: "The Personal Statement is an essay you write to describe yourself and your achievements.",
                    completed: false,
                    ready: true,
                    typeformID: "MDHUre"
                },
                {
                    id: 4,
                    title: "Preparing for the Interview",
                    description: "We'll give you a couple of tips on how to prepare the Interview",
                    completed: false,
                    ready: false,
                    typeformID: "MDHUre"
                }
            ]
        };
    }
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
                  <JourneyHome {...this.props} modules={this.state.modules} />:
                  <JourneyModule module={this.state.modules.filter(m => m.id = this.props.match.params.id)[0]} {...this.props} />
              }
            </Container>

    }
}

export default Journey;
