import React, {Component} from 'react';
import {Col, Container, Form, Row, Button, Alert, Tabs, Tab, Nav} from "react-bootstrap";
import {Icon} from "react-fa";
import ProgressChart from "../journey/ProgressChart";
import RelationshipTile from "./RelationshipTile";

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relationships: [
                {
                    mentee: {
                        id: 3,
                        firstName: "Riccardo",
                        emailAddress: "riccardo@broggi.co.uk",
                        pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/t/5bb721a4e2c48357967f52fa/1538728361542/Riccardo.jpg?format=300w"
                    },
                    mentor: {
                        id: 1,
                        firstName: "Emil",
                        course: "Philosophy",
                        university: "Oxford",
                        pictureUrl: "https://media.licdn.com/dms/image/C4E03AQGlbrCAUfvWlQ/profile-displayphoto-shrink_800_800/0?e=1548288000&v=beta&t=vdnVA5UEjlo7WWmNHxXFCWNgvEUsK1sTEPysG3GHOtw"
                    },
                    progress: 50
                }, {
                    mentee: {
                        id: 3,
                        firstName: "Catriona",
                        emailAddress: "riccardo@broggi.co.uk",
                        pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb2580eeef1a197ab25d9cf/1538659979387/LinkedIn+Headshot.png?format=500w"
                    },
                    mentor: {
                        id: 1,
                        firstName: "Emil",
                        course: "Alex",
                        university: "Oxford",
                        pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb257eeec212d94bfb1ec35/1538415414370/27747541_865005767039622_4075308886654729626_o.jpg?format=500w"
                    },
                    progress: 64
                }, {
                    mentee: {
                        id: 3,
                        firstName: "Anna",
                        emailAddress: "riccardo@broggi.co.uk",
                        pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5a7c3a6653450a8017a4dd11/1538511549752/Anna.jpg?format=500w"
                    },
                    mentor: {
                        id: 1,
                        firstName: "Raphael",
                        course: "Philosophy",
                        university: "Oxford",
                        pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb24ac19140b713a2fe714c/1538411224076/Raphael.jpeg?format=500w"
                    },
                    progress: 29
                }, {
                    mentee: {
                        id: 3,
                        firstName: "Johanna",
                        emailAddress: "riccardo@broggi.co.uk",
                        pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb2538ec83025ec9aa303a9/1538413472637/35943589_10212129123569503_6674639723585077248_n.jpg?format=500w"
                    },
                    mentor: {
                        id: 1,
                        firstName: "Filip",
                        course: "Philosophy",
                        university: "Oxford",
                        pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb24fc6e4966bf3c9d5df59/1538412681321/33038092_1063433287139499_9178229761615331328_n.jpg?format=500w"
                    },
                    progress: 75
                }, {
                    mentee: {
                        id: 3,
                        firstName: "Henning",
                        emailAddress: "riccardo@broggi.co.uk",
                        pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb259e28165f5a2736d1a0f/1538824695598/20840824_1472104999536081_8363351716822259875_n.jpg?format=500w"
                    },
                    mentor: {
                        id: 1,
                        firstName: "Nicole",
                        course: "Philosophy",
                        university: "Oxford",
                        pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb257a29140b75265e2b89e/1538667677946/0+%289%29.jpeg?format=500w"
                    },
                    progress: 21
                }
            ]
        };
    }

    render() {
        return (
            <Container fluid>
                <Tabs defaultActiveKey="dashboard" id="uncontrolled-tab-example">
                    <Tab eventKey="dashboard" title="Dashboard">
                        <Row>
                            {
                                this.state.relationships.map(r => {
                                    return (
                                        <Col md={2}>
                                            <RelationshipTile {...r} />
                                        </Col>
                                    );
                                })
                            }
                        </Row>
                    </Tab>
                    <Tab eventKey="mentees" title="Mentees">
                        <Tab.Container id="left-tabs-example" defaultActiveKey="database">
                            <Row>
                                <Col md={2}>
                                    <Nav variant="pills" className="flex-column">
                                        <Nav.Item>
                                            <Nav.Link eventKey="database">Database</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="approvals">Approvals</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="statistics">Statistics</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col md={10}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="database">
                                            Database
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="approvals">
                                            Approvals
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="statistics">
                                            Statistics
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Tab>
                    <Tab eventKey="mentors" title="Mentors">
                        Mentors
                    </Tab>
                </Tabs>


            </Container>
        );
    }

}

export default Admin;
