import React, {Component} from 'react';
import {Col, Container, Form, Row, Button, Alert, Image} from "react-bootstrap";
import {Icon} from "react-fa";
import ImageUploader from 'react-images-upload';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.state = {
            email: props.user ? props.user.email : '',
            profilePicToUpload: null,
            pictures: [],
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
        if(nextProps.status === "logged-in") this.setState({email: nextProps.user.email})
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === true) {
            this.setState({ isLoading: true }, () => {
                const formData = new FormData();
                formData.append('file', this.state.profilePicToUpload[0]);
                fetch("/api/users/edit", {
                    headers: {
                        'Authorization': `Bearer ${window.localStorage.getItem("token")}`
                    },
                    method: "POST",
                    body: formData
                }).then(res => {
                    if(res.status === 200) {
                        this.setState({
                            isLoading: false,
                            outcome: <Alert variant={'success'}>Settings updated successfully</Alert>
                        });
                    }
                    else {
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

    handleFileUpload = (event) => {
        this.setState({profilePicToUpload: event.target.files});
    };


    //TODO Crop pic so it is guaranteed to be square

    render() {

        return this.props.user ? <Container>
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
                            <div className="settings-user-image-container" onClick={() => alert("Will do soon!")}>
                                <Image rounded alt="User avatar" src={this.props.user.pictureUrl ||
                                "https://media1.tenor.com/images/8d5e73b8d9dd9c7da3cf33c6bbaccb12/tenor.gif"}
                                       className="settings-user-image" />
                                <input label='upload picture' type='image' onChange={this.handleFileUpload}>

                                </input>
                                    <div className="hover-user-image-overlay">
                                        <div className="hover-user-image-text">
                                            <Icon name="fas fa-camera"/>
                                            <br />
                                            {this.props.user.pictureUrl ? "Change your profile photo" : "Upload your profile picture"}
                                        </div>
                                    </div>
                            </div>

                            <ImageUploader
                                withIcon={true}
                                buttonText='Choose images'
                                onChange={this.onDrop}
                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                maxFileSize={5242880}
                            />

                        </Col>
                    </Form.Row>
                    <br />
                    <Form.Row>
                        <Col md={6}>
                            <Form.Group controlId="email">
                                <h5>Email Address</h5>
                                <Form.Control type="email" value={this.state.email} required
                                              onChange={(e) => this.setState({ email: e.target.value })}/>
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
                <br />
                <Row>
                    <Col>
                        {this.state.outcome}
                    </Col>
                </Row>
            </Container> : <div>Not logged in</div>;
    }

}

export default Settings;
