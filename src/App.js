import React, {Component} from 'react';
import {Icon} from 'react-fa'
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {Redirect, Route, Switch} from "react-router-dom";
import Journey from "./journey/Journey";
import Mentoring from "./mentoring/Mentoring";
import KnowledgeBase from "./knowledgebase/KnowledgeBase";
import Logo from './pa_key_white.png'
import './App.css'


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: "Riccardo Luca"
            },
            journey: {
                modules: [
                    {
                        id: 1,
                        title: "Getting Started with your Mentor",
                        description: "In this module, you'll learn how to get started",
                        completed: true
                    },
                    {
                        id: 2,
                        title: "Subject Choice: How to orient yourself",
                        description: "Choosing your subject can be daunting, here we'll give you a couple tips",
                        completed: true
                    },
                    {
                        id: 3,
                        title: "Writing your Personal Statetement",
                        description: "The Personal Statement is an essay you write to describe yourself and your achievements.",
                        completed: false
                    },
                    {
                        id: 4,
                        title: "Preparing for the Interview",
                        description: "We'll give you a couple of tips on how to prepare the Interview",
                        completed: true
                    }
                ]
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
                                    <NavDropdown.Item href="">Settings</NavDropdown.Item>
                                    <NavDropdown.Item href="">Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>


                    </Navbar>
                </header>
                <Switch>
                    <Route path='/mentor' component={Mentoring}/>
                    <Route path='/journey/:id?' render={(props) => <Journey {...props} user={this.state.user} journey={this.state.journey}/>}/>
                    <Route path='/knowledgebase' component={KnowledgeBase}/>
                    <Redirect to="mentor"/>
                </Switch>
            </div>
        );
    }
}

export default App;
