import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Logo from '../../assets/pa_key_white.png';
import { Badge, Form, FormControl, InputGroup, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Icon } from 'react-fa';
import UserCircle from './UserCircle';
import * as _ from 'lodash';
import FacingIssueButton from './FacingIssueButton';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { getUser, logout } from '../../actions/actionCreator';
import { withRouter } from 'react-router-dom';

const Header = ({ user, logout, history, location, refreshUser }) => {
  let userDropdown;

  const removeCacheAndlogout = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    logout();
  };

  if (user) {
    const pictureUrl = _.get(user, `${user.type === 'mentee' ? 'menteeProfile' : 'mentorProfile'}.pictureUrl`);
    userDropdown = <NavDropdown style={{ marginRight: '50px' }} title={<span>
      {user.firstName} {' '}
      {pictureUrl ? <UserCircle pictureUrl={pictureUrl}/> : <Icon name={'fas fa-user'}/>}
      </span>} id="user-dropdown">

      <LinkContainer to="/settings">
        <NavDropdown.Item>
          <span> <Icon name="fas fa-gear"/> Settings</span>
        </NavDropdown.Item>
      </LinkContainer>

      {_.get(user, 'mentorProfile.admin') || _.get(user, 'mentorProfile.campusTeamAdmin') ?
        <LinkContainer to="/admin/dashboard">
          <NavDropdown.Item>
            <span> <Icon name="fas fa-user-secret"/> Admin</span>
          </NavDropdown.Item>
        </LinkContainer>
        : null
      }

      <NavDropdown.Item>
        <span onClick={() => refreshUser().then(r => {
          if (r.success) toast.success('Refreshed');
          else toast.error('Error refreshing');
        })}>
          <Icon name={'fas fa-refresh'}/> Refresh
        </span>
      </NavDropdown.Item>

      <NavDropdown.Item href="">
        <span onClick={() => {
          removeCacheAndlogout();
          history.push('/');
        }}> <Icon name="fas fa-sign-out"/> Sign Out</span>
      </NavDropdown.Item>

      <NavDropdown.Item>
        <FacingIssueButton/>
      </NavDropdown.Item>

    </NavDropdown>;
  } else if (location.pathname === '/login') {
    userDropdown = <Nav.Link onClick={() => history.push('/onboard')}><span><Icon
      name={'fas fa-user'}/> Sign Up</span></Nav.Link>;
  } else userDropdown =
    <Nav.Link onClick={() => history.push('/login')}><span><Icon name={'fas fa-user'}/> Login</span></Nav.Link>;

  return (
    <Navbar fixed="top" className='pa_orange_background' variant="dark" expand="lg" collapseOnSelect>
      <LinkContainer to="/">
        <Navbar.Brand><span><img src={Logo} width={30}
                                                  alt="logo"/>  Project Access</span></Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">

          {user ? <LinkContainer to={'/message'}>
            <Nav.Link>Messages<Badge variant="light">{' 3'}</Badge>
            </Nav.Link>
          </LinkContainer> : null}

          {user ? <LinkContainer to={'/call'}>
            <Nav.Link>Call</Nav.Link>
          </LinkContainer> : null}

          {user && user.type === 'mentor' ? <LinkContainer to={'/jobs'}>
            <Nav.Link>Jobs
            </Nav.Link>
          </LinkContainer> : null}

          <LinkContainer to="/guides">
            <Nav.Link>Guides</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/about">
            <Nav.Link>About</Nav.Link>
          </LinkContainer>
        </Nav>

        {/*<Form>*/}
        {/*  <span style={{border: '1px red', borderRadius: 20}}>*/}
        {/*    <Icon name={'fas fa-bell'}/> {' '}*/}
        {/*  </span>*/}
        {/*</Form>*/}

        <Form inline>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text><Icon name="fas fa-search"/></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl type="text" style={{ width: '250px' }}
                         placeholder="Questions? We have answers!"
                         onChange={(v) => history.push(`/search/${v.target.value}`)}/>
          </InputGroup>
        </Form>
        <Nav>
          {userDropdown}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(connect(({ user }) => {
  return { user };
}, dispatch => {
  return {
    refreshUser: () => dispatch(getUser()),
    logout: () => dispatch(logout())
  };
})(Header));
