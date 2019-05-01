import React from 'react';
import MentorHome from './MentorHome';
import MenteeHome from './MenteeHome';
import { Redirect } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import * as _ from 'lodash';

const UploadProfilePictureButton = ({mode, user}) => {
  return <div>
    87% of our {mode}s upload a profile picture, it helps put a face to a name!
    <LinkContainer to={'/settings'}>
      <Button variant={_.get(user, `${mode}Profile.pictureUrl`) ? 'success' : 'primary'}>
        {_.get(user, `${mode}Profile.pictureUrl`) ? '✅' : '📸'} Upload a Profile Picture
      </Button>
    </LinkContainer>
  </div>
};

export default UploadProfilePictureButton;
