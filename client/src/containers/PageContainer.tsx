import { Container } from 'reactstrap';
import { NavBar } from '../components/NavBar';
import React from 'react';

export const PageContainer: React.FunctionComponent = ({ children }) => {
  return (
    <Container className="main" fluid>
      <NavBar />
      <Container>{children}</Container>
    </Container>
  );
};

export default PageContainer;
