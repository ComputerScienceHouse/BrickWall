import InfoSpinner from '../../components/InfoSpinner';
import React from 'react';

export const Authenticating: React.FunctionComponent = () => {
  return <InfoSpinner isCentered>Redirecting to CSH SSO</InfoSpinner>;
};

export default Authenticating;
