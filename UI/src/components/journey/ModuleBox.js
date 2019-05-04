import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { Icon } from 'react-fa';
import moment from 'moment';


const ModuleBox = (props) => {
  return (
    <Container className={`journey-module-box ${props.module.completed ? "pa_blue_background" : "pa_orange_background"}`}>
      <Row>
        <Col md={7}>
          <h5> {props.module.title}
          </h5>
          <p>
            {props.module.description}
          </p>
        </Col>
        <Col md={5}>
          {props.module.ready ?
            <Container>
              <b>
                {props.module.completed ? `✅ Completed ${props.module.typeformID ? `on ${moment(props.module.completed).format("MMM Do YYYY")}` : ""} 🎉` : "Take the next step! 🚀"}
              </b>
              {props.module.typeformID ?
                <LinkContainer to={`/journey/${props.module.typeformID}`} disabled={!props.module.ready}
                               className="pa_orange_link">
                  <Button block className='pa_orange_background'>
                    {props.module.completed ? "Take again!" : "Start now!"}
                  </Button>
                </LinkContainer> : null}
            </Container> :
            <OverlayTrigger placement="bottom" overlay={
              <Tooltip placement="bottoom" className="in">
                <span role="img" aria-label="rocket">🖐</span>
                Not too fast, you have to complete the previous one first!
                <span role="img" aria-label="rocket">😉</span>
              </Tooltip>}>
              <Icon name="fas fa-lock" className='large_orange_icon'/>
            </OverlayTrigger>
          }

        </Col>
      </Row>
    </Container>
  );
};

export default ModuleBox;
