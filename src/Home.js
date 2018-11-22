import React, {Component} from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Breadcrumb, Col, Container, Row} from "react-bootstrap";
import {Route} from "react-router-dom";
import Settings from './settings/Settings'
import Mentoring from "./mentoring/Mentoring";
import JourneyModule from "./journey/JourneyModule";
import './App.css'
import Chat from "./chat/Chat";
import Call from "./call/Call";

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            active: 2,
            milestones: [{
                id: 1,
                title: "Subject choice",
                description: "The choice of a subject bla bla bla",
                progress: 10,
                date: "June/July",
                completed: true,
                ready: true,
                typeformID: "MDHUre"
            },{
                id: 2,
                title: "Personal Statement",
                description: "Preparing your personal statement involves bla bla",
                progress: 30,
                date: "September",
                completed: false,
                ready: true,
                typeformID: "MDHUre"

            },{
                id: 3,
                title: "Oxbridge deadline",
                description: "The deadline for Obridge bla bla bla",
                progress: 50,
                date: "15 October",
                completed: false,
                ready: false,
                typeformID: "MDHUre"

            },{
                id: 4,
                title: "Interviews",
                description: "Preparing your interviews bla bla",
                progress: 70,
                date: "December",
                completed: false,
                ready: false,
                typeformID: "MDHUre"
            },{
                id: 5,
                title: "Offer",
                description: "Receiving the offer bla bla bla",
                progress: 90,
                date: "January",
                completed: false,
                ready: false,
                typeformID: "MDHUre"
            },{
                id: 6,
                title: "Ready, start!",
                description: "Ready to start bla bla",
                progress: 100,
                date: "September",
                completed: false,
                ready: false,
                typeformID: "MDHUre"
            }]
        }
        this.routes = [
            {
                exact: true,
                path: "/",
                breadcrumb: () =>
                    <LinkContainer to="/">
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                    </LinkContainer>,
                render: (props) => <Mentoring user={this.props.user} mentor={this.props.mentor} {...props} {...this.state} changeSection={(m) => this.setState({active: m.id})} />
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
                render: () => <Settings />
            },
            {
                exact: false,
                path: "/chat",
                breadcrumb: () => <Breadcrumb.Item>Chat</Breadcrumb.Item>,
                render: () => <Chat />
            },
            {
                exact: false,
                path: "/call",
                breadcrumb: () => <Breadcrumb.Item>Call</Breadcrumb.Item>,
                render: () => <Call />
            }
        ];

    }

    render() {
         return (<Container fluid>
                 <Row>
                     <Col>
                         <Breadcrumb>
                             {this.routes.map((route,index) => <Route key={index} path={route.path} render={route.breadcrumb}/>)}
                         </Breadcrumb>
                     </Col>
                 </Row>
                     {this.routes.map((route,index) => <Route exact={route.exact} key={index} path={route.path} render={route.render}/>)}
             </Container>
         );
     }
};

export default Home;
