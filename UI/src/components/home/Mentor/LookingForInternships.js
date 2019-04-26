import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Icon } from 'react-fa';

const LookingForInternships = () => {
  return (
    <div>
      <h5>
        Looking for internships or career advice? 🤓
      </h5>
      <p>
        Did you know a number of companies from many different sectors have partnered with us to help our mentors get career
        guidance and facilitated access to incredible internships?
        <LinkContainer to={'/jobs'}>
          <Button variant={'link'}>Head over to Project Access to Cool Jobs now! <Icon name={'fas fa-briefcase'}/></Button>
        </LinkContainer>
      </p>
    </div>
  );
};

export default LookingForInternships;
