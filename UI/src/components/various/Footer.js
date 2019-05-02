import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Badge, Nav, Navbar } from 'react-bootstrap';
import { Icon } from 'react-fa';

const Footer = () => {
  return <Navbar sticky="bottom" variant="light" bg="light" expand={'lg'} collapseOnSelect>
    <Navbar.Brand>
      <Badge variant="info">
        Dev
      </Badge>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
    <Navbar.Collapse className="justify-content-end">

      <Nav className="mr-auto">
        <Navbar.Text>
          This is a work in progress, bear with us! V0.1.2019-05-01
        </Navbar.Text>
      </Nav>

      <Nav className="mr-auto">
        <Navbar.Text style={{ marginLeft: '250px' }}>
          <LinkContainer to="/datapolicy" style={{
            cursor: 'pointer',
            textDecoration: 'underline'
          }}><span
          >Data policy</span></LinkContainer>
        </Navbar.Text>
      </Nav>

      <Nav>
        <Navbar.Text>
          Made with <Icon style={{ color: 'red' }} name="fas fa-heart"/> <span> at </span>
          <LinkContainer to={'/about'} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
            <span>Project Access</span>
          </LinkContainer>
        </Navbar.Text>
      </Nav>
    </Navbar.Collapse>
  </Navbar>;
};

export default Footer;
