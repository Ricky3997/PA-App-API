import React, { Component } from "react";
import { Button, Image, Modal } from "react-bootstrap";
import { Icon } from "react-fa";
import Dropzone from "react-dropzone";
import AvatarEditor from "react-avatar-editor";

class ProfilePicture extends Component {

  storeCroppedImage = (event) => {
    if (this.editor) {
      this.editor.getImage().toBlob((file) => {
        console.log("here");
        this.props.storePictureCropped(file);
        this.props.togglePicturePicker();
      });
    }
  };


  render() {

    const { user, settings, togglePicturePicker, removePictureToCrop, storePictureToCrop } = this.props;

    let imageToRender;
    if (settings.pictureCropped) imageToRender = URL.createObjectURL(settings.pictureCropped);
    else if (user && user.pictureUrl) imageToRender = user.pictureUrl;
    else imageToRender = "https://media1.tenor.com/images/8d5e73b8d9dd9c7da3cf33c6bbaccb12/tenor.gif";

    return <div>

      <div className="settings-user-image-container" onClick={() => togglePicturePicker()}>
        <Image rounded alt="User avatar" src={imageToRender}
               className="settings-user-image"/>

        <div className="hover-user-image-overlay">
          <div className="hover-user-image-text">
            <Icon name="fas fa-camera"/>
            <br/>
            {user.pictureUrl ? "Change your profile photo" : "Upload your profile picture"}
          </div>
        </div>
      </div>

      <Modal show={settings.showPicturePicker} backdrop="static">
        <Modal.Header>
          <Modal.Title>Upload Profile Picture</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Dropzone
            style={{ width: "400px", height: "400px" }}
            disableClick
            onDrop={d => storePictureToCrop(d[0])}
          >
            {settings.pictureToCrop ?
              <div>
                <AvatarEditor
                  scale={1}
                  border={50}
                  image={settings.pictureToCrop}
                  ref={(editor) => this.editor = editor}
                />
                <Button onClick={() => removePictureToCrop()}>Select a different one</Button>
              </div> :
              ({ open }) => (
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
          <Button variant="secondary" onClick={() => togglePicturePicker()}>Cancel</Button>
          <Button variant="primary" onClick={this.storeCroppedImage}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  }
};

export default ProfilePicture;