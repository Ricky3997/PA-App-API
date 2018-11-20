import React, {Component} from 'react';
import {Col, Row} from "react-bootstrap";
import ProgressChart from "./ProgressChart";
import ModuleBox from "./ModuleBox";

class JourneyHome extends Component {
    render() {
        return (
        <Row style={{paddingTop: "10px", marginLeft: "10px", }}>
            <Col md={8}>
                <Row style={{textAlign: "left"}}>
                    <h2>
                        Welcome to your Journey, {this.props.user.firstName}
                    </h2>
                </Row>
                <Row>
                    <h5>
                        Take the next step: <span role="img" aria-label="rocket">🚀</span>
                    </h5>
                </Row>
                <Row>
                    {this.props.journey.modules.filter(module => !module.completed).map(module => <ModuleBox module={module}/> )}
                </Row>

                <Row>
                    <h5>
                        Modules you've completed <span role="img" aria-label="party">🎉</span>
                    </h5>
                </Row>
                <Row>
                    {this.props.journey.modules.filter(module => module.completed).map(module => <ModuleBox module={module}/> )}
                </Row>
            </Col>
            <Col md={{ size: '2', offset: 1 }}>
                <Row style={{marginTop: "50px"}}>
                    <ProgressChart completed={this.props.journey.modules.filter(module => module.completed).length}
                                   missing={this.props.journey.modules.filter(module => !module.completed).length}/>
                </Row>
                <Row>
                    <h5 style={{transform: "translateX(25%)", fontWeight: "500", textAlign: "center"}}>
                        You're on track to your <br/>dream University! 💪
                    </h5>
                </Row>
            </Col>
        </Row>
        );
    }
}

export default JourneyHome;
