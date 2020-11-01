import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { withOidcSecure } from '@axa-fr/react-oidc-context';
import { Home } from './index';
import { CompaniesPage } from './Pages/CompaniesPage';
import { CompanyPage } from './Pages/CompanyPage';
import PageContainer from '../containers/PageContainer';

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
