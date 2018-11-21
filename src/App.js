import React, {Component} from 'react';
import {Icon} from 'react-fa'
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {Redirect, Route, Switch} from "react-router-dom";
import Journey from "./journey/Journey";
import Settings from './settings/Settings'
import Mentoring from "./mentoring/Mentoring";
import KnowledgeBase from "./knowledgebase/KnowledgeBase";
import Logo from './pa_key_white.png'
import './App.css'


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: "Riccardo",
                emailAddress: "riccardo@broggi.co.uk",
                role: "mentee"
            },
            mentor: {
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
                        <LinkContainer to="/mentor">
                            <Navbar.Brand><span><img src={Logo} width={30}
                                                     alt="logo"/>  Project Access</span></Navbar.Brand>
                        </LinkContainer>

                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <LinkContainer to="/mentor"><Nav.Link>Mentor</Nav.Link></LinkContainer>
                                <LinkContainer to="/knowledgebase"><Nav.Link>Knowledge Base</Nav.Link></LinkContainer>
                                <LinkContainer to="/journey"><Nav.Link>Journey</Nav.Link></LinkContainer>
                            </Nav>
                            <Nav>
                                <NavDropdown title={<span><Icon name="fas fa-user"/> {this.state.user.firstName}</span>}
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
                <Switch>
                    <Route path='/mentor' render={(props) => <Mentoring {...props} {...this.state}/>}/>
                    <Route path='/journey/:id?' render={(props) => <Journey {...props} {...this.state}/>}/>
                    <Route path='/knowledgebase' component={KnowledgeBase}/>
                    <Route path='/settings' component={Settings}/>
                    <Redirect to="mentor"/>
                </Switch>
            </div>
        );
    }
}

export default App;
