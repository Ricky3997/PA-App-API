import React from "react";
import { Badge, Button, Col, Form, Image, ProgressBar, Row } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { Icon } from "react-fa";
import defaults from "../../defaults/defaults";
import { Toast as toast } from "react-toastify";
import CountryFlag from "../various/CountryFlag";

const MenteeConfirm = (props) => {

  return <div>
    <Row style={{ paddingTop: "80px" }}>
      <Col md={{ span: 6, offset: 3 }}>
        <p>
          Fantastic {props.user.firstName}, thanks for completing this!! Let's recap all your information to make sure
          it's right and then you'll be ready to go
        </p>
      </Col>
    </Row>

    <Row>
      <Col md={{ span: 2, offset: 3 }}>

        <Badge variant="info">{"From"}</Badge>
      </Col>
      <Col md={{ span: 4 }}>
        <Form.Label>{`${props.onboarding.city}, ${props.onboarding.country}`} <CountryFlag country={props.onboarding.country}/>
        </Form.Label>
      </Col>
    </Row>

    <Row>
      <Col md={{ span: 2, offset: 3 }}>
        <Badge variant="info">{"Gender Identity"}</Badge>
      </Col>
      <Col md={{ span: 4 }}>
        <Form.Label>{`${props.onboarding.gender}`} </Form.Label>
      </Col>
    </Row>

    <Row>
      <Col md={{ span: 2, offset: 3 }}>
        <Badge variant="info">{"First Generation"}</Badge>
      </Col>
      <Col md={{ span: 4 }}>
        <Form.Label>{`${props.onboarding.firstGenStudent ? "Yes" : "No"}`} </Form.Label>
      </Col>
    </Row>


    <Row>
      <Col md={{ span: 2, offset: 3 }}>
        <Badge variant="info">{"Current school"}</Badge>
      </Col>
      <Col md={{ span: 4 }}>
        <Form.Label>{`${props.onboarding.school}`}</Form.Label>
      </Col>
    </Row>


    <Row>
      <Col md={{ span: 2, offset: 3 }}>
        <Badge variant="info">{"Year"}</Badge>
      </Col>
      <Col md={{ span: 4 }}>
        <Form.Label>{`${props.onboarding.year}`}</Form.Label>
      </Col>
    </Row>

    <Row>
      <Col md={{ span: 2, offset: 3 }}>
        <Badge variant="info">{"Currently studying"}</Badge>
      </Col>
      <Col md={{ span: 4 }}>
        <Form.Label>{`${props.onboarding.subjects.join(", ")}`}</Form.Label>
      </Col>
    </Row>

    <Row>
      <Col md={{ span: 2, offset: 3 }}>
        <Badge variant="info">{"Applying for"}</Badge>
      </Col>
      <Col md={{ span: 4 }}>
        {props.onboarding.unisApplyingFor.map(uAf => <Image key={uAf}
                                                            src={[...defaults.universities.US, ...defaults.universities.UK].filter(u => u.name === uAf)[0].logo}
                                                            style={{ maxHeight: "60px", maxWidth: "130px" }}/>)}
      </Col>
    </Row>


    <Row>
      <Col md={{ span: 2, offset: 3 }}>
        <Badge variant="info">{"Interested in"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        {props.onboarding.interestedIn.join(", ")}
      </Col>
    </Row>

    <Row>
      <Col md={{ span: 2, offset: 3 }}>
        <Badge variant="info">{"Level"}</Badge>
      </Col>
      <Col md={{ span: 4 }}>
        <Form.Label>{`${props.onboarding.level}`}</Form.Label>
      </Col>
    </Row>

    <Row>
      <Col md={{ span: 2, offset: 3 }}>
        <Button block onClick={() => props.changeStage(3)}>
          <span><Icon name="fas fa-arrow-left"/>{" Previous"}  </span>
        </Button>
      </Col>
      <Col md={{ span: 2 }} style={{ paddingTop: "10px" }}>
        <ProgressBar striped now={100} label={`${100}%`}/>
      </Col>
      <Col md={{ span: 2 }}>
        <Button variant="success" block disabled={props.onboarding.registering} onClick={() => {
          props.registerMentee().then(r => {
            if (r.success) toast.success("Registered successfully!");
          });
        }}>
          {props.onboarding.registering ? <Loader type="Oval" color="#ffffff" width="20" height="20"/> :
            <span>Perfect, let's go!</span>}
        </Button>
      </Col>
    </Row>
  </div>;
};

export default MenteeConfirm;
