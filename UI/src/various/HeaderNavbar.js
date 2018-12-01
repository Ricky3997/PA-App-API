import React from 'react';
import {LinkContainer} from "react-router-bootstrap";
import Logo from "../pa_key_white.png";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Icon} from "react-fa";
import UserCircle from "./UserCircle";

const HeaderNavbar = (props) => {
    let userDropdown;

    if(props.user){
        userDropdown = <NavDropdown title={<span>
                <UserCircle pictureUrl={props.user.pictureUrl}/>
            {props.user.firstName}</span>} id="user-dropdown">
            <LinkContainer to="/settings">
                <NavDropdown.Item>
                    <span> <Icon name="fas fa-gear"/> Settings</span>
                </NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item href="">
                <span onClick={props.logout}> <Icon name="fas fa-sign-out"/> Sign Out</span>
            </NavDropdown.Item>
        </NavDropdown>;
    } else if(props.location.pathname === "/login") {
        userDropdown = <Nav.Link onClick={() => props.history.push("/onboard")}><span><Icon name={"fas fa-user"}/> Sign Up</span></Nav.Link>;
    } else userDropdown = <Nav.Link onClick={() => props.history.push("/login")}><span><Icon name={"fas fa-user"}/> Login</span></Nav.Link>;

    return (
        <Navbar style={{"backgroundColor": "#eb9d26"}} variant="dark" expand="lg">
            <LinkContainer to="/">
                <Navbar.Brand><span><img src={Logo} width={30}
                                         alt="logo"/>  Project Access</span></Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {props.status === "logged-in" && props.user.admin ?
                        <LinkContainer to="/admin">
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

export default HeaderNavbar;
