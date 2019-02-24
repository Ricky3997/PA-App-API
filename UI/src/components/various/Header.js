import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import Logo from "../../assets/pa_key_white.png";
import { Badge, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Icon } from "react-fa";
import UserCircle from "./UserCircle";
import * as _ from "lodash";

const Header = (props) => {
  let userDropdown;

  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    props.logout();
  };

  if (props.user) {
    const pictureUrl = _.get(props.user, `${props.user.type === "mentee" ? "menteeProfile" : "mentorProfile"}.pictureUrl`);
    userDropdown = <NavDropdown title={<span>
            {pictureUrl ? <UserCircle pictureUrl={pictureUrl}/> : <Icon name={"fas fa-user"}/>}
      {props.user.firstName}</span>} id="user-dropdown">
      <LinkContainer to="/settings">
        <NavDropdown.Item>
          <span> <Icon name="fas fa-gear"/> Settings</span>
        </NavDropdown.Item>
      </LinkContainer>
      <NavDropdown.Item href="">
        <span onClick={() => {
          logout();
          props.history.push("/");
        }}> <Icon name="fas fa-sign-out"/> Sign Out</span>
      </NavDropdown.Item>
    </NavDropdown>;
  } else if (props.location.pathname === "/login") {
    userDropdown = <Nav.Link onClick={() => props.history.push("/onboard")}><span><Icon
      name={"fas fa-user"}/> Sign Up</span></Nav.Link>;
  } else userDropdown =
    <Nav.Link onClick={() => props.history.push("/login")}><span><Icon name={"fas fa-user"}/> Login</span></Nav.Link>;

  return (
    <Navbar fixed="top" style={{ "backgroundColor": "#eb9d26" }} variant="dark" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand><span><img src={Logo} width={30}
                                 alt="logo"/>  Project Access</span></Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">

          {props.user ? <LinkContainer to={"/message"}>
            <Nav.Link>Messages
              {/*<Badge variant="light">3</Badge>*/}
            </Nav.Link>
          </LinkContainer> : null}
          {props.user ? <LinkContainer to={"/call"}>
            <Nav.Link>Call</Nav.Link>
          </LinkContainer> : null}
          {_.get(props, "user.admin") ?
            <LinkContainer to="/admin/dashboard">
              <Nav.Link>Admin</Nav.Link>
            </LinkContainer>
            : null
          }
        </Nav>
        <Nav>
          {userDropdown}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
