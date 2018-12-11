import React, {Component} from 'react';
import {Col, Container, Form, Row, Button, Alert, Image, Modal} from "react-bootstrap";
import {Icon} from "react-fa";
import Dropzone from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
import * as _ from "lodash";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.fillStateFromUserProps = this.fillStateFromUserProps.bind(this);
        this.state = {
            firstName: '',
            email: '',
            profilePicToUpload: null,
            image: null,
            showPictureModal: false,
            outcome: null,
            validated: false,
            isLoading: false,
            changeProfilePicture: false
        };
    }

    componentDidMount() {
        this.fillStateFromUserProps(this.props)
    }


    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.user) this.fillStateFromUserProps(nextProps)
    }

    fillStateFromUserProps(props) {
        let newState = {};
        if(props.user){
            newState.email = props.user.email;
            newState.firstName = props.user.firstName;
        }
        if (_.get(props, "user.onboarded")) {
            if (props.user.type === "mentor" && props.user.mentorProfile) {
                Object.keys(props.user.mentorProfile).map(k => newState[k] = props.user.mentorProfile[k]);
            }

            if (props.user.type === "mentee" && props.user.menteeProfile) {
                //TODO
            }
        }
        this.setState(newState);
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === true) {
            this.setState({isLoading: true}, () => {
                const formData = new FormData();

                if(this.state.profilePicToUpload){
                    formData.append('file', this.state.profilePicToUpload);
                }
                let changedData = {
                    university: this.state.university,
                    subject:  this.state.subject,
                    level: this.state.level,
                    country: this.state.country,
                    firstGenStudent:  this.state.firstGenStudent === "Yes",
                    city: this.state.city,
                    gender: this.state.gender,
                    year:  parseInt(this.state.year),
                    area:  this.state.area,
                };
                formData.append("data", JSON.stringify(changedData));
                formData.append("userData", JSON.stringify({email: this.state.email, firstName: this.state.firstName}));
                fetch("/api/users/edit", {
                    headers: {
                        'Authorization': `Bearer ${window.localStorage.getItem("token")}`
                    },
                    method: "POST",
                    body: formData
                }).then(res => {
                    if (res.status === 200) {
                        this.setState({
                            isLoading: false,
                            profilePicToUpload: null,
                            image: null,
                            outcome: <Alert variant={'success'}>Settings updated successfully</Alert>
                        });
                        res.json().then(payload => {
                            this.props.editUserDetails(payload);
                        })
                    } else {
                        this.setState({
                            isLoading: false,
                            outcome: <Alert variant={'danger'}>Error editing profile</Alert>
                        });
                    }
                })
                    .catch((err) => {
                        this.setState({
                            isLoading: false,
                            outcome: <Alert variant={'danger'}>Error editing profile</Alert>
                        });
                    })

            });
        }
    }


    handleDrop = dropped => {
        this.setState({image: dropped[0]})
    };

    storeCroppedImage = (event) => {
        if (this.editor) {
            this.editor.getImage().toBlob((file) => {
                this.setState({profilePicToUpload: file, showPictureModal: false});
            });
        } else alert("error")
    };


    setEditorRef = (editor) => this.editor = editor;

    render() {
        let imageToRender;
        if (this.state.profilePicToUpload) imageToRender = URL.createObjectURL(this.state.profilePicToUpload);
        else if (this.props.user && this.props.user.pictureUrl) imageToRender = this.props.user.pictureUrl;
        else imageToRender = "https://media1.tenor.com/images/8d5e73b8d9dd9c7da3cf33c6bbaccb12/tenor.gif";
        return this.props.user ? <div>
            <Container>
                <Row>
                    <Col>
                        <h2>
                            Edit Your Profile
                        </h2>
                    </Col>
                </Row>
                <Form
                    noValidate
                    validated={this.state.validated}
                    onSubmit={e => this.handleSubmit(e)}>
                    <Form.Row>
                        <Col md={3}>
                            <h5>Profile picture </h5>
                            <div className="settings-user-image-container"
                                 onClick={() => this.setState({showPictureModal: true})}>
                                <Image rounded alt="User avatar" src={imageToRender}
                                       className="settings-user-image"/>

                                <div className="hover-user-image-overlay">
                                    <div className="hover-user-image-text">
                                        <Icon name="fas fa-camera"/>
                                        <br/>
                                        {this.props.user.pictureUrl ? "Change your profile photo" : "Upload your profile picture"}
                                    </div>
                                </div>
                            </div>

                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="email">

                                <h5>Your Name</h5>
                                <Form.Control type="text" value={this.state.firstName} required
                                              onChange={(e) => this.setState({firstName: e.target.value})}/>
                                <br />
                                <h5>Email Address</h5>
                                <Form.Control type="email" value={this.state.email} required
                                              onChange={(e) => this.setState({email: e.target.value})}/>
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                                <Form.Control.Feedback type="invalid">
                                    Please use a valid email address
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <br/>

                    {_.get(this.props, "user.type", "") === "mentor" ? (<div>
                        <Row>
                        <Col>
                            <h5>University</h5>
                            <Form.Control value={this.state.university} required
                                          onChange={(e) => this.setState({university: e.target.value})}/>
                        </Col>
                        <Col>
                            <h5>Subject</h5>
                            <Form.Control value={this.state.subject} required
                                          onChange={(e) => this.setState({subject: e.target.value})}/>
                        </Col>
                        <Col>
                            <h5>Area of study</h5>
                            <Form.Control as="select" value={this.state.area}
                                          onChange={e => this.setState({area: e.target.value})}>
                                <option>Natural Sciences</option>
                                <option>Humanities</option>
                                <option>Social Sciences</option>
                                <option>Engineering</option>
                                <option>Business and Economics</option>
                            </Form.Control>
                        </Col>
                        </Row>

                        <Row>
                            <Col>
                                <h5>Degree Type</h5>
                                <Form.Control as="select" value={this.state.level} required
                                              onChange={(e) => this.setState({level: e.target.value})}>
                                    <option>Undergraduate</option>
                                    <option>Masters</option>
                                    <option>Doctorate</option>
                                </Form.Control>
                            </Col>
                            <Col>
                                <h5>Year</h5>
                                <Form.Control as="select" value={this.state.year} required
                                              onChange={(e) => this.setState({year: e.target.value})}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6+</option>
                                </Form.Control>
                            </Col>
                            <Col>
                                <h5>First Generation Student</h5>
                                <Form.Control as="select" value={this.state.firstGenStudent} required
                                              onChange={(e) => this.setState({firstGenStudent: e.target.value})}>
                                    <option>Yes</option>
                                    <option>No</option>
                                </Form.Control>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h5>Country</h5>
                                <Form.Control value={this.state.country} required
                                              onChange={(e) => this.setState({country: e.target.value})}/>
                            </Col>
                            <Col>
                                <h5>City</h5>
                                <Form.Control value={this.state.city} required
                                              onChange={(e) => this.setState({city: e.target.value})}/>
                            </Col>
                            <Col>
                                <h5>Gender</h5>
                                <Form.Control as="select" value={this.state.gender} required
                                              onChange={e => this.setState({gender: e.target.value})}>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Prefer not to say</option>
                                </Form.Control>
                            </Col>
                        </Row>

                    </div>) : null}

                    <br/>

                    <Form.Row>
                        <Col md={{size: 2, offset: 8}}>
                            <Button variant="secondary" block onClick={() => this.props.history.push("/")}>
                                Cancel
                            </Button>
                        </Col>
                        <Col md={{size: 2}}>
                            <Button variant="success" block type="submit" disabled={this.state.isLoading}>
                                {this.state.isLoading ? 'Loading…' : 'Save'}
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
                <br/>
                <Row>
                    <Col>
                        {this.state.outcome}
                    </Col>
                </Row>
            </Container>
            <Modal show={this.state.showPictureModal} onHide={() => this.setState({showPictureModal: false})}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Profile Picture</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Dropzone
                        style={{width: "400px", height: "400px"}}
                        disableClick
                        onDrop={this.handleDrop}
                    >
                        {this.state.image ?
                            <div>
                                <AvatarEditor
                                    scale={1}
                                    border={50}
                                    image={this.state.image}
                                    ref={this.setEditorRef}
                                />
                                <Button onClick={() => this.setState({image: null})}>Select a different one</Button>
                            </div> :
                            ({open}) => (
                                <React.Fragment>
                                    <Button onClick={() => open()}>
                                        Select or drag and drop
                                    </Button>
                                </React.Fragment>
                            )

                        }
                    </Dropzone>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.setState({showPictureModal: false})}>Cancel</Button>
                    <Button variant="primary" onClick={this.storeCroppedImage}>Save</Button>
                </Modal.Footer>
            </Modal>
        </div> : <div>Not logged in</div>;
    }

}

export default Settings;
