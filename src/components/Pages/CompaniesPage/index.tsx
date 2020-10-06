import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardImg,
  CardSubtitle,
  CardTitle,
  Col,
  Row
} from 'reactstrap';
import { useCompanies } from '../../../api/company';
import InfoSpinner from '../../InfoSpinner';
import { ViewSelector } from '../../ViewSelector';
import { MenuBar } from '../../MenuBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TooltipHover } from '../../TooltipHover';
import {
  faComments,
  faHandshake,
  faBookOpen
} from '@fortawesome/free-solid-svg-icons';

export const CompaniesPage: React.FunctionComponent = () => {
  const { companies, isLoading } = useCompanies(true, true, true, true);

  const companyList = companies?.map(company => {
    return (
      <Col key={company.id} sm={4} md={3}>
        <Card style={{ marginBottom: '2vh' }}>
          <CardImg
            top
            height={'100px'}
            src="https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            alt={`${company.name}'s Logo`}
            style={{
              width: '100%',
              height: '15vw',
              objectFit: 'cover'
            }}
          />
          <CardBody>
            <CardTitle>{company.name}</CardTitle>
            <CardSubtitle>
              <a
                href={company.website ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
              >
                {company.website}
              </a>
            </CardSubtitle>
          </CardBody>
          <CardFooter>
            <TooltipHover
              idName={`reviews-count-${company.name
                .replace(/\s+/g, '-')
                .toLowerCase()}`}
              label={`${
                company.JobReviews ? company.JobReviews.length : null
              } Reviews`}
            >
              <FontAwesomeIcon icon={faBookOpen} />{' '}
              {company.JobReviews ? company.JobReviews.length : null}
            </TooltipHover>
            &nbsp;
            <TooltipHover
              idName={`interviews-count-${company.name
                .replace(/\s+/g, '-')
                .toLowerCase()}`}
              label={`${
                company.Interviews ? company.Interviews.length : null
              } Interviews`}
            >
              <FontAwesomeIcon icon={faComments} />{' '}
              {company.Interviews ? company.Interviews.length : null}
            </TooltipHover>
            &nbsp;
            <TooltipHover
              idName={`offers-count-${company.name
                .replace(/\s+/g, '-')
                .toLowerCase()}`}
              label={`${company.Offers ? company.Offers.length : null} Offers`}
            >
              <FontAwesomeIcon icon={faHandshake} />{' '}
              {company.Offers ? company.Offers.length : null}
            </TooltipHover>
          </CardFooter>
        </Card>
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
          <Button color="link">Add it!</Button>
        </p>
      </Row>
    </div>
  );
};
