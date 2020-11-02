import { Button, Col, Row } from 'reactstrap';

import { CompanyCard } from '@csh/ui/components/CompanyCard';
import { CreateCompanyModal } from '@csh/ui/components/CreateCompanyModal';
import InfoSpinner from '@csh/ui/components/InfoSpinner';
import { MenuBar } from '@csh/ui/components/MenuBar';
import React from 'react';
import { ViewSelector } from '@csh/ui/components/ViewSelector';
import { useCompanies } from '@csh/ui/api/company';
import useToggle from 'react-use/lib/useToggle';

export const CompaniesPage: React.FunctionComponent = () => {
  const { companies, isLoading } = useCompanies(true, true, true, true);

  const [isCreateCompanyOpen, toggleCreateCompanyModal] = useToggle(false);

  const companyList = companies?.map(company => {
    return (
      <Col key={company.id} sm={4} md={3}>
        <CompanyCard company={company} />
      </Col>
    );
  });

  return (
    <div>
      <MenuBar>
        <ViewSelector />
      </MenuBar>
      {isLoading ? (
        <div
          style={{
            justifyContent: 'center',
            textAlign: 'center',
            flex: 'auto'
          }}
        >
          <InfoSpinner isCentered>Loading Companies</InfoSpinner>
        </div>
      ) : (
        <Row xs={'6'}>{companyList}</Row>
      )}
      <Row xs={'1'}>
        <p style={{ textAlign: 'center', flex: 'auto' }}>
          Don't see the company you're looking for?{' '}
          <Button color="link" onClick={toggleCreateCompanyModal}>
            Add it!
          </Button>
          <CreateCompanyModal
            isOpen={isCreateCompanyOpen}
            toggle={toggleCreateCompanyModal}
          />
        </p>
      </Row>
    </div>
  );
};
