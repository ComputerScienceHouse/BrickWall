import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { useCompany } from '../../../api/company';
import { JobType } from '../../../api/types/position';
import { CompanySummary } from '../../CompanySummary';
import InfoSpinner from '../../InfoSpinner';
import { SalaryBar } from '../../SalaryBar';
import { ViewSection } from '../../enums';
import { OfferItem } from '../../OfferItem';
import { ReviewItem } from '../../ReviewItem';
import { InterviewItem } from '../../InterviewItem';

interface RouteParams {
  companyId: string;
}

export const CompanyPage: React.FunctionComponent = () => {
  const { companyId } = useParams<RouteParams>();
  const { company, isLoading } = useCompany(+companyId, true, true, true, true);

  const [display, setDisplay] = React.useState<JobType>();
  const [selection, setSelection] = React.useState<ViewSection>(
    ViewSection.REVIEWS
  );

  const mainView: { [key in ViewSection]: React.ReactNode } = {
    [ViewSection.REVIEWS]: company?.JobReviews?.filter(
      review => review.position.job_type === display || display === undefined
    ).map(review => <ReviewItem key={review.id} review={review} />),
    [ViewSection.OFFERS]: company?.Offers?.filter(
      offer => offer.position.job_type === display || display === undefined
    ).map(offer => <OfferItem key={offer.id} offer={offer} />),
    [ViewSection.INTERVIEWS]: company?.Interviews?.filter(
      interview =>
        interview.position.job_type === display || display === undefined
    ).map(interview => (
      <InterviewItem key={interview.id} interview={interview} />
    ))
  };

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
              <CompanySummary
                company={company}
                setDisplay={setDisplay}
                selection={selection}
                setSelection={setSelection}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={8} xs={12}>
              {mainView[selection]}
            </Col>
            <Col sm={4} className={'d-none d-sm-block'}>
              {company.Offers ? (
                <Card style={{ marginBottom: '1.5vh' }}>
                  <CardBody>
                    <SalaryBar offers={company.Offers} display={display} />
                  </CardBody>
                </Card>
              ) : undefined}
              {company.Offers ? (
                <Card>
                  <CardBody>Average offer expiration</CardBody>
                </Card>
              ) : undefined}
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};
