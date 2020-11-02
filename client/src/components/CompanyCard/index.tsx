import {
  Card,
  CardBody,
  CardFooter,
  CardImg,
  CardSubtitle,
  CardTitle
} from 'reactstrap';
import {
  faBookOpen,
  faComments,
  faHandshake,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';

import { Company } from '@csh/ui/api/types/company';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import React from 'react';
import { TooltipHover } from '../TooltipHover';

interface CompanyCardProps {
  company: Company;
}

export const CompanyCard: React.FunctionComponent<CompanyCardProps> = ({
  company
}) => {
  return (
    <Link
      to={`/company/${company.id}`}
      style={{ color: 'inherit', textDecoration: 'inherit' }}
    >
      <Card style={{ marginBottom: '4vh' }}>
        <CardImg
          top
          height={'100px'}
          src={
            company.logo
              ? `https://assets.csh.rit.edu/brickwall/${company.logo}`
              : 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
          }
          alt={`${company.name}'s Logo`}
          style={{
            width: '100%',
            height: '10vw',
            objectFit: 'cover'
          }}
        />
        <CardBody>
          <CardTitle>{company.name}</CardTitle>
          <CardSubtitle style={{ fontSize: '11px' }}>
            {company.headquarters ? (
              <>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                &nbsp;
                {company.headquarters.city},{' '}
                {company.headquarters.state
                  ? company.headquarters.state
                  : company.headquarters.country}
              </>
            ) : undefined}
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
    </Link>
  );
};
