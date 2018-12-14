import React from "react";
import { Navbar } from "react-bootstrap";
import Badge from "react-bootstrap/es/Badge";
import { Icon } from "react-fa";

const Footer = ({history}) => {
  return <Navbar sticky="bottom" variant="light" bg="light" >
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
        Made with <Icon style={{color: "red"}} name="fas fa-heart"/> at <a onClick={() => history.push("/about")}> Project Access</a>
      </Navbar.Text>
    </Navbar.Collapse>
  </Navbar>;
};

export default Footer;
