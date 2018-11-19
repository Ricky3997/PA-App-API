import React, {Component} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import JourneyModule from "./JourneyModule";
import {Doughnut} from 'react-chartjs'

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
                   <Col md={4}>
                       <Doughnut data={[{
                           value: 22,
                           color:"#F7464A",
                           highlight: "#FF5A5E",
                           label: "Completed"
                       },
                       {
                           value: 88,
                           color: "#46BFBD",
                           highlight: "#5AD3D1",
                           label: "Missing"
                       }]} options={{}}/>
                   </Col>
               </Row>
                <Row>
                    <Col md={8}>
                        Completed
                        <LinkContainer to={"/journey/1"} style={{"backgroundColor": "#eb9d26","borderColor": "#eb9d26"}} >
                            <Button block style={{"backgroundColor": "#eb9d26"}}>
                                Module 1 | Getting started
                            </Button>
                        </LinkContainer>
                    </Col>
                    <Col md={4}>

                    </Col>
                </Row>
            </Container>
        ): (
            <JourneyModule {...this.props}/>
        );
    }
}

export default Journey;
