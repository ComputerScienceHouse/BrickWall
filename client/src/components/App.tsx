import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { CompaniesPage } from '@csh/ui/pages/CompaniesPage';
import { CompanyPage } from '@csh/ui/pages/CompanyPage';
import { Home } from './index';
import PageContainer from '../containers/PageContainer';
import { withOidcSecure } from '@axa-fr/react-oidc-context';

class App extends Component {
  render() {
    return (
      <Router>
        <PageContainer>
          <Switch>
            <Route exact path="/" component={withOidcSecure(Home)} />
            <Route
              exact
              path={'/companies'}
              component={withOidcSecure(CompaniesPage)}
            />
            <Route
              exact
              path={'/company/:companyId'}
              component={withOidcSecure(CompanyPage)}
            />
          </Switch>
        </PageContainer>
      </Router>
    );
  }
}

export default App;
