import './menubar.scss';

import React from 'react';

export const MenuBar: React.FunctionComponent = ({ children }) => {
  return <div className={'menu-bar'}>{children}</div>;
};
