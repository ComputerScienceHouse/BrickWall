import InfoSpinner from '../../components/InfoSpinner';
import { Jumbotron } from 'reactstrap';
import React from 'react';

export const LoggingIn: React.FunctionComponent = () => {
  return (
    <Jumbotron>
      <InfoSpinner isCentered>Logging In</InfoSpinner>
    </Jumbotron>
  );
};

export default LoggingIn;
