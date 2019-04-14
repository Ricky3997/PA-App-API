import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Icon } from 'react-fa';
import FeatureNotReadyYetOnHover from './FeatureNotReadyYetOnHover';

const GDPR = () => {
  return <Container>
    <Row>
      <Col>
        <FeatureNotReadyYetOnHover>
        <div>
        <h2>Your data is... well yours! <Icon name={'fas fa-lock'}/></h2>
        <p>
          This is our data policy because.. you guessed it, GDPR is a thing for us too!
        </p>
        <h4>Short version</h4>
        <p>
          We, at Project Access, have a strong commitment to protect the privacy of all individuals in respect of which
          it processes information. We will only collect and use information in a manner consistent with your rights and
          our obligations under applicable law.
          <br/>
          This Privacy Policy (the “Policy”) describes how information about you is collected and used by us or shared
          with others, how we safeguard it and how you may access and control its use.
          <br/>
          This Policy applies to visitors to our website located at www.projectaccess.org (the “Site”) inclusive of any
          sub-domains of the Site, our social media pages, and to all users or potential users (applicants, mentors,
          contributors, volunteers/staff and website users) of our services (the “Services”).
          <br/>
          Protecting your privacy is paramount to us. Please read the following carefully to understand our views and
          practices regarding your information. By using the Site and the Services and/or otherwise interacting with
          Project Access, you consent to us processing your personal data and other information in accordance with this
          Policy. If you do not accept and agree with this Privacy Policy then you must stop using our Services
          immediately.
          <br/>
          If you have any questions, concerns or comments about this Policy, please contact us at <a
          href="mailto:admin@projectaccess.org" target={'_blank'}>admin@projectaccess.org</a>.

        </p>
        <h4>
          Our Privacy Motto</h4>
        <p>
          <ol>
            <li>
              We are transparent about the information we hold about you.
            </li>
            <li>
              We will work with you to keep your information accurate and current.
            </li>
            <li>
              We will do our best to keep your information secure and prevent unauthorised access to it.
            </li>
            <li>
              We will delete information when it is no longer required to deliver our Services or when you ask us to do
              so and we have no legal obligation to retain such information.
            </li>
          </ol>
        </p>
        <h4>
          Full Version
        </h4>
        <p>
          For a full version, please see <a href="https://projectaccess.org/privacy-policyg"
                                            target={'_blank'}>projectaccess.org/privacy-policy</a>.
        </p>
        </div>
        </FeatureNotReadyYetOnHover>
      </Col>
    </Row>
  </Container>;
};

export default GDPR;
