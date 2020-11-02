import './index.scss';

import {
  AuthenticationProvider,
  InMemoryWebStorage,
  oidcLog
} from '@axa-fr/react-oidc-context';

import App from './components/App';
import { Authenticating } from './callbacks/Authenticating';
import { LoggingIn } from './callbacks/LoggingIn';
import { NotAuthenticated } from './callbacks/NotAuthenticated';
import { NotAuthorized } from './callbacks/NotAuthorized';
import React from 'react';
import ReactDOM from 'react-dom';
import oidcConfiguration from './config';

ReactDOM.render(
  <AuthenticationProvider
    configuration={oidcConfiguration}
    loggerLevel={oidcLog.DEBUG}
    isEnabled={true}
    UserStore={InMemoryWebStorage}
    callbackComponentOverride={LoggingIn}
    authenticating={Authenticating}
    notAuthenticated={NotAuthenticated}
    notAuthorized={NotAuthorized}
  >
    <App />
  </AuthenticationProvider>,
  document.getElementById('root')
);
