import React, {Component} from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Breadcrumb, Col, Container, Row} from "react-bootstrap";
import {Route, Switch} from "react-router-dom";
import Settings from './settings/Settings'
import Mentoring from "./mentoring/Mentoring";
import JourneyModule from "./journey/JourneyModule";
import './App.css'

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
    }

     createBreadcrumbs() {
        //TODO
        return this.props.match.params.id === undefined ? null :
            <Breadcrumb.Item active>Module {this.props.match.params.id}</Breadcrumb.Item>

    };

    render() {
         return (<Container fluid>
                 <Row>
                     <Col>
                         <Breadcrumb>
                             <LinkContainer to="/">
                                 <Breadcrumb.Item>Home</Breadcrumb.Item>
                             </LinkContainer>
                             {this.createBreadcrumbs()}
                         </Breadcrumb>
                     </Col>
                 </Row>
                     <Switch>
                         <Route path='/journey/:id' render={(props) => <JourneyModule {...this.state} user={this.props.user} mentor={this.props.mentor} {...props} />}/>
                         <Route path='/settings' component={Settings}/>
                         <Route render={(props) => <Mentoring user={this.props.user} mentor={this.props.mentor} {...props} {...this.state} changeSection={(m) => this.setState({active: m.id})} />}/>
                     </Switch>
             </Container>
         );
     }
};

export default Home;
