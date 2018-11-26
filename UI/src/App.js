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
            user: {
                firstName: "Riccardo Luca",
                emailAddress: "riccardo@broggi.co.uk",
                pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/t/5bb721a4e2c48357967f52fa/1538728361542/Riccardo.jpg?format=300w",
                role: "admin"
            },
            mentor: {
                id: 1,
                firstName: "Emil",
                course: "Philosophy",
                university: "Oxford",
                pictureUrl: "https://media.licdn.com/dms/image/C4E03AQGlbrCAUfvWlQ/profile-displayphoto-shrink_800_800/0?e=1548288000&v=beta&t=vdnVA5UEjlo7WWmNHxXFCWNgvEUsK1sTEPysG3GHOtw"
            }
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
                render: (props) => <JourneyModule {...this.state} user={this.props.user} mentor={this.props.mentor} {...props} />
            },
            {
                exact: false,
                path: "/settings",
                breadcrumb: () => <Breadcrumb.Item>Settings</Breadcrumb.Item>,
                render: () => <Settings user={this.props.user} />
            },
            {
                exact: false,
                path: "/admin/:section?",
                breadcrumb: () => <Breadcrumb.Item>Admin</Breadcrumb.Item>,
                render: (props) => <Admin user={this.props.user} {...props} />
            },
            {
                exact: false,
                path: "/message",
                breadcrumb: () => <Breadcrumb.Item>Message</Breadcrumb.Item>,
                render: (props) => <Message {...this.props} {...props}/>
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
                                {this.state.user.role === "admin" ?
                                    <LinkContainer to="/admin">
                                        <Nav.Link>Admin</Nav.Link>
                                    </LinkContainer>
                                    : null
                                }
                            </Nav>
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
