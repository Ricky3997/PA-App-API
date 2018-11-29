import React from 'react';
import {LinkContainer} from "react-router-bootstrap";
import Breadcrumb from "react-bootstrap/es/Breadcrumb";
import Mentoring from "../mentoring/Mentoring";
import JourneyModule from "../journey/JourneyModule";
import Settings from "./Settings";
import Admin from "../admin/Admin";
import Message from "../message/Message";
import Call from "../call/Call";
import MentorProfile from "../people/MentorProfile";
import {Col, Container, Row} from "react-bootstrap";
import {Route} from "react-router-dom";

const LoggedInApp = (props) => {
    const routes = [
        {
            exact: false,
            path: "/home",
            breadcrumb: () => <LinkContainer to="/"><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>,
            render: (routeProps) => <Mentoring {...props} {...routeProps} />
        },
        {
            exact: false,
            path: "/journey/:id",
            breadcrumb: () => <Breadcrumb.Item disabled>Journey</Breadcrumb.Item>,
            render: (routeProps) => <JourneyModule {...props} {...routeProps} />
        },
        {
            exact: false,
            path: "/settings",
            breadcrumb: () => <Breadcrumb.Item>Settings</Breadcrumb.Item>,
            render: () => <Settings {...props} />
        },
        {
            exact: false,
            path: "/admin/:section?",
            breadcrumb: () => <Breadcrumb.Item>Admin</Breadcrumb.Item>,
            render: (routeProps) => <Admin {...props} {...routeProps} />
        },
        {
            exact: false,
            path: "/message",
            breadcrumb: () => <Breadcrumb.Item>Message</Breadcrumb.Item>,
            render: (routeProps) => <Message {...props} {...routeProps}/>
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
            render: (routeProps) => <MentorProfile {...props} {...routeProps}/>
        }
    ];
    return (
        <Container fluid>
            <Row>
                <Col>
                    <Breadcrumb>
                        {routes.map((route,index) => <Route key={index} path={route.path} render={route.breadcrumb}/>)}
                    </Breadcrumb>
                </Col>
            </Row>
            {routes.map((route,index) => <Route exact={route.exact} key={index} path={route.path} render={route.render}/>)}
        </Container>
    );
};

export default LoggedInApp;
