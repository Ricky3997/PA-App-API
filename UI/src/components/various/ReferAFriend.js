import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import * as Yup from 'yup';
import { Form as FormikForm, Formik } from 'formik';
import { Icon } from 'react-fa';
import FeatureNotReadyYetOnHover from './FeatureNotReadyYetOnHover';

const ReferAFriend = ({mentorMode}) => {
  return <Formik
    validationSchema={Yup.object({ emailAddress: Yup.string().email().required() })}
    initialValues={{ emailAddress: '' }}
    onSubmit={() => alert('TODO')}
    render={({ values, errors , setFieldValue }) => (<FormikForm noValidate>
        <h4>Invite a friend 💌</h4>
      {mentorMode ? <p>Tell your friends to join, their help could change a younger student's life! 🚀</p> :
        <p>Tell your friends to join, they could also get help like you! 🚀</p>}
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Their email address"
            name="emailAddress"
            value={values.emailAddress}
            onChange={(v) => setFieldValue('emailAddress', v.target.value)}
            isInvalid={!!errors.emailAddress}
          />
          <InputGroup.Append>
            <Button disabled type='submit' variant="outline-secondary">

              <FeatureNotReadyYetOnHover>
              <Icon name='fas fa-send'/> Invite
            </FeatureNotReadyYetOnHover>
            </Button>
          </InputGroup.Append>

          <Form.Control.Feedback type="invalid">
            {errors.emailAddress}
          </Form.Control.Feedback>
        </InputGroup>
      </FormikForm>
    )}
  />;
};

export default ReferAFriend;
