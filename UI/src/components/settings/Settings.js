import React, {Component} from 'react';
import {Col, Container, Form, Row, Alert} from "react-bootstrap";
import * as _ from "lodash";
import {Redirect} from "react-router-dom";
import MentorSettings from "./MentorSettings";
import ProfilePicture from "./ProfilePicture";
import MenteeSettings from "./MenteeSettings";

class Settings extends Component {

    //
    // handleSubmit(event) {
    //     const form = event.currentTarget;
    //     event.preventDefault();
    //     event.stopPropagation();
    //     if (form.checkValidity() === true) {
    //         this.setState({isLoading: true}, () => {
    //             const formData = new FormData();
    //
    //             if(this.state.profilePicToUpload){
    //                 formData.append('file', this.state.profilePicToUpload);
    //             }
    //             let changedData = {
    //                 university: this.state.university,
    //                 subject:  this.state.subject,
    //                 level: this.state.level,
    //                 country: this.state.country,
    //                 firstGenStudent:  this.state.firstGenStudent === "Yes",
    //                 city: this.state.city,
    //                 gender: this.state.gender,
    //                 year:  parseInt(this.state.year),
    //                 area:  this.state.area,
    //             };
    //             formData.append("data", JSON.stringify(changedData));
    //             formData.append("userData", JSON.stringify({email: this.state.email, firstName: this.state.firstName}));
    //             fetch("/api/users/edit", {
    //                 headers: {
    //                     'Authorization': `Bearer ${window.localStorage.getItem("token")}`
    //                 },
    //                 method: "POST",
    //                 body: formData
    //             }).then(res => {
    //                 if (res.status === 200) {
    //                     this.setState({
    //                         isLoading: false,
    //                         profilePicToUpload: null,
    //                         image: null,
    //                         outcome: <Alert variant={'success'}>Settings updated successfully</Alert>
    //                     });
    //                     res.json().then(payload => {
    //                         this.props.setUser(payload);
    //                     })
    //                 } else {
    //                     this.setState({
    //                         isLoading: false,
    //                         outcome: <Alert variant={'danger'}>Error editing profile</Alert>
    //                     });
    //                 }
    //             })
    //                 .catch((err) => {
    //                     this.setState({
    //                         isLoading: false,
    //                         outcome: <Alert variant={'danger'}>Error editing profile</Alert>
    //                     });
    //                 })
    //
    //         });
    //     }
    // }
    //

    render() {
        const {user, settings, togglePicturePicker, storePictureToCrop, removePictureToCrop, storePictureCropped} = this.props;
        return this.props.user ? <div>
            <Container>
                <Row>
                    <Col>
                        <h2>
                            Edit Your Profile
                        </h2>
                    </Col>
                </Row>
                <div>
                    <Form.Row>
                        <Col md={3}>
                            <h5>Profile picture </h5>
                            <ProfilePicture user={user} settings={settings}
                                            togglePicturePicker={togglePicturePicker}
                                            storePictureToCrop={storePictureToCrop}
                                            removePictureToCrop={removePictureToCrop}
                                            storePictureCropped={storePictureCropped}
                            />

                        </Col>
                        <Col md={6}>
                            {/*<Form.Group controlId="email">*/}

                                {/*<h5>Your Name</h5>*/}
                                {/*<Form.Control type="text" value={this.state.firstName} required*/}
                                              {/*onChange={(e) => this.setState({firstName: e.target.value})}/>*/}
                                {/*<br />*/}
                                {/*<h5>Email Address</h5>*/}
                                {/*<Form.Control type="email" value={this.state.email} required*/}
                                              {/*onChange={(e) => this.setState({email: e.target.value})}/>*/}
                                {/*<Form.Text className="text-muted">*/}
                                    {/*We'll never share your email with anyone else.*/}
                                {/*</Form.Text>*/}
                                {/*<span>{this.props.user.emailConfirmed ? "Email Confirmed" : "Email Not Confirmed"}</span>*/}
                            {/*</Form.Group>*/}
                        </Col>
                    </Form.Row>
                    <br/>

                    {/*{this.props.user.type === "mentor" ? <MentorSettings /> : <MenteeSettings/>}*/}

                </div>
            </Container>
        </div> : <Redirect to={"/"} />;
    }

}

export default Settings;
