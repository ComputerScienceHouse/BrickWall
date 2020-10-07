import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { useCompany } from '../../../api/company';
import { JobType } from '../../../api/types/position';
import { CompanySummary } from '../../CompanySummary';
import InfoSpinner from '../../InfoSpinner';
import { SalaryBar } from '../../SalaryBar';

interface RouteParams {
  companyId: string;
}

export const CompanyPage: React.FunctionComponent = () => {
  const { companyId } = useParams<RouteParams>();
  const { company, isLoading } = useCompany(+companyId, true, true, true, true);

  const [display, setDisplay] = React.useState<JobType>();

  return (
    <div>
      {isLoading || company === undefined ? (
        <div
          style={{
            justifyContent: 'center',
            textAlign: 'center',
            flex: 'auto'
          }}
        >
          <InfoSpinner isCentered>Loading Company</InfoSpinner>
        </div>
      ) : (
        <>
          <Row style={{ marginBottom: '1.5vh' }}>
            <Col>
              <CompanySummary company={company} setDisplay={setDisplay} />
            </Col>
          </Row>
          <Row>
            <Col sm={8} xs={12}>
              <Card>
                <CardBody></CardBody>
              </Card>
            </Col>
            <Col sm={4} className={'d-none d-sm-block'}>
              {company.Offers ? (
                <Card>
                  <CardBody>
                    <SalaryBar offers={company.Offers} display={display} />
                  </CardBody>
                </Card>
              ) : undefined}
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};
