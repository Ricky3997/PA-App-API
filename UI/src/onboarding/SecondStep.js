import React from 'react';
import {Badge, Button, Col, Form, Image, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import PALogo from "../pa_key.png";

const SecondStep = (props) => {
    if (!props.user) return null;
    return <Form>
            <Form.Row style={{paddingTop: "80px"}}>
                <Col md={{span: 6, offset: 3}}>
                    <p>
                        Awesome {props.user.firstName}!! Now we'll ask you a couple of details so it's easier to find
                        the perfect match with a {props.user.type === "mentee" ? "current university student who can help you!" : "younger student needing your help!"}
                    </p>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col md={{span: 3, offset: 3}}>
                    <Form.Label>Your country of origin</Form.Label>
                    <Form.Control value={props.country}
                                  onChange={props.changeCountry}/>

                </Col>
                <Col md={{span: 3}}>

                    <Form.Label>Your city of origin</Form.Label>
                    <Form.Control value={props.city}
                                  onChange={props.changeCity}/>
                </Col>
            </Form.Row>
            <Form.Row>
            <Col md={{span: 3, offset: 3}}>
                <Form.Label>Your gender</Form.Label>
                <Form.Control as="select" value={props.gender}
                              onChange={props.changeGender}>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Prefer not to say</option>
                </Form.Control>

            </Col>
            <Col md={{span: 3}}>

                <Form.Label><span>{"First generation student? "}

                    <OverlayTrigger placement="bottom"
                                    overlay={<Tooltip placement="bottoom" className="in">
                                        {props.user.type === "mentee" ?
                                            "Knowing whether your parents went to University will help us find a current university student coming from your same background who will be able to relate to you better!!" :
                                            "Knowing whether your parents went to University will help us find a younger student needing your help who, coming from your same background, will be able to relate to you better!!"}
                                       </Tooltip>}>
                                    <Badge pill variant="info">
                                        Why?
                                    </Badge>
                                </OverlayTrigger>
                    </span></Form.Label>
                <Form.Control as="select" value={props.firstGenStudent}
                              onChange={props.changeFirstGenStudent}>
                    <option>Yes</option>
                    <option>No</option>
                </Form.Control>
            </Col>
        </Form.Row>

        <br/>

        <Form.Row>
            <Col md={{span: 6, offset: 3}}>
                <Button variant="success" block onClick={() => props.changeStep(3)}>
                    Next
                </Button>
            </Col>
        </Form.Row>
    </Form>
}


export default SecondStep;
