import React, {Component} from 'react';
import {Icon} from 'react-fa'
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {Route} from "react-router-dom";
import Logo from './pa_key_white.png'
import './App.css'
import Home from "./Home";
import UserCircle from "./settings/UserCircle";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: "Riccardo",
                emailAddress: "riccardo@broggi.co.uk",
                pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/t/5bb721a4e2c48357967f52fa/1538728361542/Riccardo.jpg?format=300w",
                role: "mentee"
            },
            mentor: {
                id: 1,
                firstName: "Emil",
                course: "Philosophy",
                university: "Oxford",
                pictureUrl: "https://media.licdn.com/dms/image/C4E03AQGlbrCAUfvWlQ/profile-displayphoto-shrink_800_800/0?e=1548288000&v=beta&t=vdnVA5UEjlo7WWmNHxXFCWNgvEUsK1sTEPysG3GHOtw"
            }
        };
    }

    render() {
        return (
            <div>
                <header>
                    <Navbar style={{"backgroundColor": "#eb9d26"}} variant="dark" expand="lg">
                        <LinkContainer to="/">
                            <Navbar.Brand><span><img src={Logo} width={30}
                                                     alt="logo"/>  Project Access</span></Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto"/>
                            <Nav>
                                <NavDropdown title={<span> <UserCircle pictureUrl={this.state.user.pictureUrl}/> {this.state.user.firstName}</span>}
                                             id="user-dropdown">
                                    <LinkContainer to="/settings">
                                        <NavDropdown.Item>
                                            <span> <Icon name="fas fa-gear"/> Settings</span>
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item href="">
                                        <span> <Icon name="fas fa-sign-out"/> Sign Out</span>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>


                    </Navbar>
                </header>
                <Route path="/" render={(props) => <Home {...props} {...this.state}/>}/>
            </div>
        );
    }
}

export default App;
