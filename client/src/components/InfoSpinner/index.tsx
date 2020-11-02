import './infospinner.scss';

import React from 'react';
import { Spinner } from 'reactstrap';

interface InfoSpinnerProps {
  isCentered?: boolean;
}

const InfoSpinner: React.FunctionComponent<InfoSpinnerProps> = ({
  children,
  isCentered = false
}) => {
  return (
    <div className={`spinner-container ${isCentered ? 'centered' : ''}`}>
      <Spinner size={'sm'} color="primary" />
      <span className="spinner-text">{children}</span>
    </div>
  );
};

export default InfoSpinner;
