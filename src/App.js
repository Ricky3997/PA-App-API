import React, {Component} from 'react';
import {Icon} from 'react-fa'
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {Redirect, Route, Switch} from "react-router-dom";
import Journey from "./journey/Journey";
import Mentoring from "./mentoring/Mentoring";
import KnowledgeBase from "./knowledgebase/KnowledgeBase";
import Logo from './pa_key_white.png'

class App extends Component {
    render() {
        return (
            <div className="App">
                <header>
                    <Navbar style={{"backgroundColor": "#eb9d26"}} variant="dark" expand="lg">
                        <LinkContainer to="/mentor">
                            <Navbar.Brand><span><img src={Logo} width={30} alt="logo"/>  Project Access</span></Navbar.Brand>
                        </LinkContainer>

                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <LinkContainer to="/mentor"><Nav.Link>Mentor</Nav.Link></LinkContainer>
                                <LinkContainer to="/knowledgebase"><Nav.Link>Knowledge Base</Nav.Link></LinkContainer>
                                <LinkContainer to="/journey"><Nav.Link>Journey</Nav.Link></LinkContainer>
                            </Nav>
                            <Nav right>
                                <NavDropdown title={<span><Icon name="fas fa-user" /> Riccardo</span>}
                                             id="user-dropdown">
                                    <NavDropdown.Item href="">Settings</NavDropdown.Item>
                                    <NavDropdown.Item href="">Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>


                    </Navbar>
                </header>
                <Switch>
                    <Route path ='/mentor' component={Mentoring}/>
                    <Route path ='/journey/:id?' component={Journey}/>
                    <Route path ='/knowledgebase' component={KnowledgeBase}/>
                    <Redirect to="mentor"/>
                </Switch>
            </div>
        );
    }
}

export default App;
