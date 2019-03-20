import React from "react";
import { Badge, Col, Form, Image, Row } from "react-bootstrap";
import defaults from "../../defaults/defaults";
import CountryFlag from "../various/CountryFlag";
import ProfileIcon from "../various/ProfileIcon";

const MenteeProfileDetails = ({
                                firstName, yearBorn, city, country, subjects, school,
                                careerInterests, interestedIn, hobbiesAndInterests, pictureUrl,
                                yearStart, unisApplyingFor, coursesApplyingFor, year, level
                              }) => {
  return (<div>
      <ProfileIcon pictureUrl={pictureUrl} size='xl' />
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
          <Form.Label>{`${subjects.join(", ")}`}</Form.Label>
        </Col>
        <Col md={2}>
          <Badge variant="info">{"School"}</Badge>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Label>{`${school}, ${year}`}</Form.Label>
        </Col>
      </Row>

      <Row>


      </Row>

      <Row>
        <Col md={2}>
          <Badge variant="info">{"Level"}</Badge>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Label>{`${level}`}</Form.Label>
        </Col>
        <Col md={2}>
          <Badge variant="info">{"Career Interests"}</Badge>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Label>{`${careerInterests.join(", ")}`}</Form.Label>
        </Col>
      </Row>

      <Row>
        <Col md={2}>
          <Badge variant="info">{"Expected Start"}</Badge>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Label>{`${yearStart}`}</Form.Label>
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
          <Badge variant="info">{"Applying for"}</Badge>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Label>{`${interestedIn.join(", ")}`}</Form.Label>
        </Col>
        <Col md={2}>
          <Badge variant="info">{"Courses"}</Badge>
        </Col>
        <Col>
          <Form.Label>{`${coursesApplyingFor.join(", ")}`}</Form.Label>
        </Col>

      </Row>


      <Row>
        <Col md={2}>
          <Badge variant="info">{"Unis interested"}</Badge>
        </Col>
        <Col md={{ span: 3 }}>
          {unisApplyingFor.map(uni => <Image
            key={uni}
            src={[...defaults.universities.US, ...defaults.universities.UK].filter(u => u.name === uni)[0].logo}
            style={{ maxHeight: "60px", maxWidth: "130px" }}/>)}
        </Col>
      </Row>
    </div>
  );
};

export default MenteeProfileDetails;
