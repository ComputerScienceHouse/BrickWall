import {
  Collapse,
  Container,
  Nav,
  NavItem,
  Navbar,
  NavbarToggler
} from 'reactstrap';

import { NavLink } from 'react-router-dom';
import Profile from './Profile';
import React from 'react';

const NavBar: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar color="primary" dark expand="lg" fixed="top">
        <Container>
          <NavLink to="/" className={'navbar-brand'}>
            BrickWall
          </NavLink>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink to="/" className={'nav-link'}>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/companies" className={'nav-link'}>
                  Companies
                </NavLink>
              </NavItem>
            </Nav>
            <Nav navbar className="ml-auto">
              <Profile />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
