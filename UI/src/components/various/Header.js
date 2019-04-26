import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Logo from '../../assets/pa_key_white.png';
import { Form, FormControl, InputGroup, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Icon } from 'react-fa';
import UserCircle from './UserCircle';
import * as _ from 'lodash';

const Header = (props) => {
  let userDropdown;

  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    props.logout();
  };

  if (props.user) {
    const pictureUrl = _.get(props.user, `${props.user.type === "mentee" ? "menteeProfile" : "mentorProfile"}.pictureUrl`);
    userDropdown = <NavDropdown style={{marginRight: '50px'}} title={<span>
      {props.user.firstName} {" "}
            {pictureUrl ? <UserCircle pictureUrl={pictureUrl}/> : <Icon name={"fas fa-user"}/>}
      </span>} id="user-dropdown">
      <LinkContainer to="/settings">
        <NavDropdown.Item>
          <span> <Icon name="fas fa-gear"/> Settings</span>
        </NavDropdown.Item>
      </LinkContainer>
      {_.get(props, "user.mentorProfile.admin") || _.get(props, "user.mentorProfile.campusTeamAdmin") ?
        <LinkContainer to="/admin/dashboard">
          <NavDropdown.Item>
            <span> <Icon name="fas fa-user-secret"/> Admin</span>
          </NavDropdown.Item>
        </LinkContainer>
        : null
      }
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

          {props.user && props.user.type === 'mentor' ? <LinkContainer to={"/jobs"}>
            <Nav.Link>Jobs
            </Nav.Link>
          </LinkContainer> : null}

          <LinkContainer to="/Guides">
            <Nav.Link>Guides</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/about">
            <Nav.Link>About</Nav.Link>
          </LinkContainer>
        </Nav>
        {/*<Form>*/}
        {/*  <span style={{border: '1px red', borderRadius: 20}}>*/}
        {/*    <Icon name={'fas fa-bell'}/> {' '}*/}
        {/*  </span>*/}
        {/*</Form>*/}
        <Form inline>
          <InputGroup >
            <InputGroup.Prepend>
              <InputGroup.Text><Icon name="fas fa-search"/></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl type="text" style={{width: '250px'}}
                          placeholder="Questions? We have answers!"
                          onChange={(v) => props.history.push(`/search/${v.target.value}`)}/>
          </InputGroup>
        </Form>
        <Nav>
          {userDropdown}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
