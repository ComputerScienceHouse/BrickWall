import React from 'react';
import './menubar.scss';

export const MenuBar: React.FunctionComponent = ({ children }) => {
  return <div className={'menu-bar'}>{children}</div>;
};
