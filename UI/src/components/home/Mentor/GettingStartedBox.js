import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { Icon } from "react-fa";
import moment from "moment";


const GettingStartedBox = (props) => {
  return (
    <Container className="journey-module-box"
               style={{ backgroundColor: props.module.completed ? "#4f84bc" : "#d64f29" , marginBottom: '50px'}}>
      <Row>
        <Col md={9}>
          <h5> {props.module.title}
          </h5>
          <p>
            {props.module.ready ? props.module.description : 'Before you can do this, you first need to complete the previous task!'}
          </p>
        </Col>
        <Col md={3}>
          {props.module.ready ?
            <Container>
              <b>
                {props.module.completed ? `✅ Completed` : (props.action ? <Button style={{marginTop: '30px'}} onClick={props.onClick}>
                    {props.action}
                </Button> : null)}
              </b>
            </Container> :
            <OverlayTrigger placement="bottom" overlay={
              <Tooltip placement="bottoom" className="in">
                <span role="img" aria-label="rocket">🖐</span>
                Not too fast, you have to complete the previous one first!
                <span role="img" aria-label="rocket">😉</span>
              </Tooltip>}>
              <Icon name="fas fa-lock" style={{ fontSize: "50px", color: "#eb9d26" }}/>
            </OverlayTrigger>
          }

        </Col>
      </Row>
    </Container>
  );
};

export default GettingStartedBox;
