import React, {Component} from 'react';
import {Icon} from 'react-fa'
import {Breadcrumb, Col, Container, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {Route} from "react-router-dom";
import Logo from './pa_key_white.png'
import './App.css'
import UserCircle from "./settings/UserCircle";
import Mentoring from "./mentoring/Mentoring";
import JourneyModule from "./journey/JourneyModule";
import Settings from "./settings/Settings";
import Admin from "./admin/Admin";
import Message from "./message/Message";
import Call from "./call/Call";
import MentorProfile from "./people/MentorProfile";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: "logged-out"
        };
        this.routes = [
            {
                exact: true,
                path: "/",
                breadcrumb: () => <LinkContainer to="/"><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>,
                render: (props) => <Mentoring {...props} {...this.state} />
            },
            {
                exact: false,
                path: "/journey/:id",
                breadcrumb: () => <Breadcrumb.Item disabled>Journey</Breadcrumb.Item>,
                render: (props) => <JourneyModule {...this.state} {...props} />
            },
            {
                exact: false,
                path: "/settings",
                breadcrumb: () => <Breadcrumb.Item>Settings</Breadcrumb.Item>,
                render: () => <Settings user={this.state.user} status={this.state.status} />
            },
            {
                exact: false,
                path: "/admin/:section?",
                breadcrumb: () => <Breadcrumb.Item>Admin</Breadcrumb.Item>,
                render: (props) => <Admin user={this.state.user} {...props} />
            },
            {
                exact: false,
                path: "/message",
                breadcrumb: () => <Breadcrumb.Item>Message</Breadcrumb.Item>,
                render: (props) => <Message {...this.state} {...props}/>
            },
            {
                exact: false,
                path: "/call",
                breadcrumb: () => <Breadcrumb.Item>Call</Breadcrumb.Item>,
                render: () => <Call />
            },
            {
                exact: true,
                path: "/mentor/:id",
                breadcrumb: () => <Breadcrumb.Item>Mentor Profile</Breadcrumb.Item>,
                render: (props) => <MentorProfile {...this.props} {...props}/>
            }
        ];
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.login();
    }

    login(){
        fetch("/api/auth/login")
            .then(res => res.json())
            .then(r => this.setState({status: "logged-in", user: r.user, mentor: r.mentor}))
    }

    logout(){
        fetch("/api/auth/logout")
            .then(res => res.json())
            .then(r => this.setState({status: "logged-out", mentor: null, user: null}))
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
                            <Nav className="mr-auto">
                                {this.state.status === "logged-in" && this.state.user.role === "admin" ?
                                    <LinkContainer to="/admin">
                                        <Nav.Link>Admin</Nav.Link>
                                    </LinkContainer>
                                    : null
                                }
                            </Nav>
                            <Nav>
                                {this.state.status === "logged-out" ? <Nav.Link onClick={this.login}><span><Icon name={"fas fa-user"}/> Login</span></Nav.Link> :
                                <NavDropdown title={<span><UserCircle pictureUrl={this.state.user.pictureUrl}/> {this.state.user.firstName}</span>} id="user-dropdown">
                                    <LinkContainer to="/settings">
                                        <NavDropdown.Item>
                                            <span> <Icon name="fas fa-gear"/> Settings</span>
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item href="">
                                        <span onClick={this.logout}> <Icon name="fas fa-sign-out"/> Sign Out</span>
                                    </NavDropdown.Item>
                                </NavDropdown>
                                }
                            </Nav>
                        </Navbar.Collapse>


                    </Navbar>
                </header>
                <Container fluid>
                    <Row>
                        <Col>
                            <Breadcrumb>
                                {this.routes.map((route,index) => <Route key={index} path={route.path} render={route.breadcrumb}/>)}
                            </Breadcrumb>
                        </Col>
                    </Row>
                    {this.routes.map((route,index) => <Route exact={route.exact} key={index} path={route.path} render={route.render}/>)}
                </Container>
            </div>
        );
    }
}

export default App;
