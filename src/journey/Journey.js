import React, {Component} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import JourneyModule from "./JourneyModule";

class Journey extends Component {
    render() {

        return this.props.match.params.id === undefined ? (
            <Container fluid>
                <Row>
                    <Col>
                        <h3>Welcome to your Journey, Riccardo!
                        </h3>
                        <br />
                        Take the next step:
                    </Col>
                </Row>
               <Row>
                   <Col md={8}>
                       <LinkContainer to={"/journey/1"} style={{"backgroundColor": "#eb9d26","borderColor": "#eb9d26"}} >
                           <Button block style={{"backgroundColor": "#eb9d26"}}>
                               Module 1 | Getting started
                           </Button>
                       </LinkContainer>
                   </Col>
               </Row>
            </Container>
        ): (
            <JourneyModule {...this.props}/>
        );
    }
}

export default Journey;
