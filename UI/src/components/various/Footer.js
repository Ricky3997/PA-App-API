import React from "react";
import { Navbar } from "react-bootstrap";
import Badge from "react-bootstrap/es/Badge";

const Footer = () => {
  return <Navbar fixed="bottom" variant="light" bg="light" >
    <Navbar.Brand>
      <Badge  variant="info">
        Alpha
      </Badge>
    </Navbar.Brand>
    <Navbar.Text>
      This is a work in progress, bear with us!
    </Navbar.Text>
    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        Made with love at Project Access
      </Navbar.Text>
    </Navbar.Collapse>
  </Navbar>;
};

export default Footer;
