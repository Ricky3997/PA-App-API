import React from 'react';
import {Col, Container, Row} from "react-bootstrap"

const NoMentorYet = (props) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h4>
                        You don't have a Mentor yet <span role="img" aria-label="time waiting">⏳</span>
                    </h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    But we're busy finding you one, wait while we fidn them!
                </Col>
            </Row>
        </Container>
    );
};

export default NoMentorYet;
