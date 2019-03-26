import React from "react";
import { Badge, Col, Form, Image, Row } from "react-bootstrap";
import CountryFlag from "../various/CountryFlag";
import ProfileIcon from "../various/ProfileIcon";
import defaults from "../../defaults/defaults";

const MentorProfileDetails = ({
                                firstName, yearBorn, city, country, subject, university,
                                careerInterests, interestedIn, hobbiesAndInterests, pictureUrl,
                                yearGraduation
                              }) => {
  return (<div>
      <ProfileIcon pictureUrl={pictureUrl} size='xl'/>
      <Row>
        <Col md={2}>
          <Badge variant="info">{"From"}</Badge>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Label>{`${city}, ${country}`} <CountryFlag country={country}/>
          </Form.Label>
        </Col>
        <Col md={{ span: 2 }}>
          <Badge variant="info">{"Year of Birth"}</Badge>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Label>{`${yearBorn}`}</Form.Label>
        </Col>
      </Row>

      <Row>
        <Col md={2}>
          <Badge variant="info">{"Currently studying"}</Badge>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Label>{`${subject}`}</Form.Label>
        </Col>
        <Col md={2}>
          <Badge variant="info">{"University"}</Badge>
        </Col>
        <Col md={{ span: 3 }}><Image
          src={[...defaults.universities.US, ...defaults.universities.UK].filter(u => u.name === university)[0].logo}
          style={{ maxHeight: "60px", maxWidth: "130px" }}/>
        </Col>
      </Row>

      <Row>
        <Col md={2}>
          <Badge variant="info">{"Expected Graduation"}</Badge>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Label>{`${yearGraduation}`}</Form.Label>
        </Col>
        <Col md={2}>
          <Badge variant="info">{"Hobbies & Interests"}</Badge>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Label>{`${hobbiesAndInterests.join(", ")}`}</Form.Label>
        </Col>
      </Row>

      <Row>
        <Col md={2}>
          <Badge variant="info">{"Career Interests"}</Badge>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Label>{`${careerInterests.join(", ")}`}</Form.Label>
        </Col>
      </Row>

    </div>
  );
};

export default MentorProfileDetails;
