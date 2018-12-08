import React, {Component} from 'react';
import {Col, Container, Form, Row, Button, Alert, Image, Modal} from "react-bootstrap";
import {Icon} from "react-fa";
import Dropzone from "react-dropzone";
import AvatarEditor from "react-avatar-editor";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.state = {
            email: props.user ? props.user.email : '',
            profilePicToUpload: null,
            image: null,
            showPictureModal: false,
            outcome: null,
            validated: false,
            isLoading: false
        };
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.status === "logged-in") this.setState({email: nextProps.user.email})
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === true) {
            this.setState({isLoading: true}, () => {
                const formData = new FormData();
                formData.append('file', this.state.profilePicToUpload);
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
                        res.json().then( payload => {return payload.pictureUrl}).then(pictureUrl => {
                            let editedUser = this.props.user;
                            editedUser.pictureUrl = pictureUrl;
                            this.props.editUserDetails(editedUser);
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
        if(this.state.profilePicToUpload) imageToRender = URL.createObjectURL(this.state.profilePicToUpload);
        else if(this.props.user) imageToRender = this.props.user.pictureUrl;
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
                    </Form.Row>
                    <br/>
                    <Form.Row>
                        <Col md={6}>
                            <Form.Group controlId="email">
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
                            </div>:
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
