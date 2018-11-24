import React, {Component} from 'react';
import {Col, Container, Form, Row, InputGroup, Image, Card, CardColumns} from "react-bootstrap";
import {Icon} from "react-fa";
import * as JsSearch from 'js-search';

class Database extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
        this.mentors = [
            {
                id: 1,
                firstName: "Riccardo",
                lastName: "Broggi",
                university: "Bath",
                course: "Computer Science",
                pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/t/5bb721a4e2c48357967f52fa/1538728361542/Riccardo.jpg?format=300w"

            }, {
                id: 2,
                firstName: "Emil",
                lastName: "Bender Lassen",
                university: "KCL",
                course: "PPE",
                pictureUrl: "https://media.licdn.com/dms/image/C4E03AQGlbrCAUfvWlQ/profile-displayphoto-shrink_800_800/0?e=1548288000&v=beta&t=vdnVA5UEjlo7WWmNHxXFCWNgvEUsK1sTEPysG3GHOtw"
            }, {
                id: 3,
                firstName: "Nicole",
                course: "International Relations",
                university: "LSE",
                pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb257a29140b75265e2b89e/1538667677946/0+%289%29.jpeg?format=500w"
            },{
                id: 4,
                firstName: "Filip",
                course: "Mathematics",
                university: "Oxford",
                pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb24fc6e4966bf3c9d5df59/1538412681321/33038092_1063433287139499_9178229761615331328_n.jpg?format=500w"
            },{
                id: 9,
                firstName: "Henning",
                course: "Economics & Management",
                university: "Oxford",
                emailAddress: "riccardo@broggi.co.uk",
                pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb259e28165f5a2736d1a0f/1538824695598/20840824_1472104999536081_8363351716822259875_n.jpg?format=500w"
            },{
                id: 5,
                firstName: "Raphael",
                course: "Economics",
                university: "UCL",
                pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb24ac19140b713a2fe714c/1538411224076/Raphael.jpeg?format=500w"
            }, {
                id: 6,
                firstName: "Anna",
                course: "History",
                university: "Oxford",
                emailAddress: "riccardo@broggi.co.uk",
                pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5a7c3a6653450a8017a4dd11/1538511549752/Anna.jpg?format=500w"
            },{
                id: 7,
                firstName: "Alexander",
                course: "PPE",
                university: "KCL",
                pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb257eeec212d94bfb1ec35/1538415414370/27747541_865005767039622_4075308886654729626_o.jpg?format=500w"
            },{
                id: 8,
                firstName: "Catriona",
                course: "Chemical Engineering",
                university: "Brown",
                emailAddress: "riccardo@broggi.co.uk",
                pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb2580eeef1a197ab25d9cf/1538659979387/LinkedIn+Headshot.png?format=500w"
            },{
                id: 10,
                firstName: "Andreas",
                lastName: "Snekloth Kongsgaard",
                course: "PPE",
                university: "LSE",
                emailAddress: "riccardo@broggi.co.uk",
                pictureUrl: "https://static1.squarespace.com/static/5a1abda8aeb6251ef0a76deb/5a7c37da652dead2372a0d71/5bb247c7e79c70440c674eec/1538667470758/14383474_1341206875897109_1207170910_n.jpg?format=500w"
            }
        ];
        this.search = new JsSearch.Search('id');
        this.search.addIndex('firstName');
        this.search.addIndex('lastName');
        this.search.addIndex('university');
        this.search.addIndex('course');
        this.search.addDocuments(this.mentors);
    }

    render() {
        const mentorsToRender = this.state.search.length > 0 ? this.search.search(this.state.search) : this.mentors;
        return (
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <Form>
                            <Form.Group>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><Icon name="fas fa-search"/></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control placeholder="Search..." value={this.state.search}
                                                  onChange={e => this.setState({search: e.target.value})}/>
                                </InputGroup>
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Control as="select">
                                        <option>University</option>
                                        <option>Oxford</option>
                                        <option>Cambridge</option>
                                    </Form.Control>
                                </Form.Group>


                                {/*TODO https://jedwatson.github.io/react-select/*/}

                                <Form.Group as={Col}>
                                    <Form.Control as="select">
                                        <option>Course</option>
                                        <option>Computer Science</option>
                                        <option>PPE</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>

                            <Form.Group>
                                <Form.Check type="checkbox" label="Include not free to mentor"/>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col md={9}>
                        <CardColumns>
                            {mentorsToRender.map(m => {
                                return <Card className="text-center">
                                        <Card.Header>
                                            <Image roundedCircle alt="Mentor avatar" src={m.pictureUrl}
                                                   style={{width: "70px"}}/>
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Title>
                                              {m.firstName}
                                            </Card.Title>
                                            <Card.Text>
                                                <span onClick={() => this.setState({search: m.course})} style={{color: "blue", cursor: "pointer"}}>{m.course}</span>
                                                <span>{" at "}</span>
                                                <span onClick={() => this.setState({search: m.university})} style={{color: "blue", cursor: "pointer"}}>{m.university}</span>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                            })}
                        </CardColumns>
                    </Col>
                </Row>
            </Container>
        );
    }

};


export default Database;
