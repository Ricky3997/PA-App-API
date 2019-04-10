import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Badge, Navbar } from "react-bootstrap";
import { Icon } from "react-fa";

const Footer = () => {
  return <Navbar sticky="bottom" variant="light" bg="light">
    <Navbar.Brand>
      <Badge variant="info">
        Alpha
      </Badge>
    </Navbar.Brand>
    <Navbar.Text>
      This is a work in progress, bear with us! V0.1.2019-04-02
    </Navbar.Text>
    <Navbar.Text style={{ marginLeft: "250px" }}>
      <LinkContainer to="/about?type=mentor" style={{
        cursor: "pointer",
        textDecoration: "underline"
      }}><span
      >Find out here</span></LinkContainer>
    </Navbar.Text>

    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        Made with <Icon style={{ color: "red" }} name="fas fa-heart"/> <span> at </span>
        <LinkContainer to={"/about"} style={{ textDecoration: "underline", cursor: "pointer" }}>
          <span>Project Access</span>
        </LinkContainer>
      </Navbar.Text>
    </Navbar.Collapse>
  </Navbar>;
};

export default Footer;
