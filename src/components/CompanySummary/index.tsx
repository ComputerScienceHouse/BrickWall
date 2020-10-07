import { faMapMarkerAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardImg
} from 'reactstrap';
import { Company } from '../../api/types/company';
import { JobType } from '../../api/types/position';
import { CompanyNav } from '../CompanyNav';

import './company.scss';

interface CompanySummaryProps {
  company: Company;
  setDisplay: (display?: JobType) => void;
}

export const CompanySummary: React.FunctionComponent<CompanySummaryProps> = ({
  company,
  setDisplay
}) => {
  const [contributeToggle, setContributeToggle] = React.useState<boolean>();

  const csherCount = React.useMemo(() => {
    return new Set([
      ...new Set(company.JobReviews?.map(review => review.member)),
      ...new Set(company.Offers?.map(offer => offer.member)),
      ...new Set(company.Interviews?.map(interview => interview.member))
    ]).size;
  }, []);

  return (
    <Card>
      <CardImg
        top
        height={'100px'}
        src="https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        alt={`${company?.name}'s Logo`}
        style={{
          width: '100%',
          height: '15vw',
          objectFit: 'cover'
        }}
      />
      <CardBody>
        <CardTitle className={'company-title'}>
          <div className={'company-name'}>
            <h2>{company?.name}</h2>
          </div>
          <div>
            <ButtonDropdown
              isOpen={contributeToggle}
              toggle={() => setContributeToggle(!contributeToggle)}
            >
              <DropdownToggle>
                <FontAwesomeIcon icon={faPlus} />
                &nbsp; Contribute
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Interview</DropdownItem>
                <DropdownItem>Offer</DropdownItem>
                <DropdownItem>Review</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
        </CardTitle>
        <CardSubtitle className={'company-subtitle'}>
          <div className={'first'}>
            {company?.website ? (
              <a href={company?.website}>{company?.website}</a>
            ) : (
              <>No Website :(</>
            )}
            &nbsp;&bull;&nbsp;
            {company?.headquarters ? (
              <div>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                &nbsp;
                {company.headquarters.city},{' '}
                {company.headquarters.state
                  ? company.headquarters.state
                  : company.headquarters.country}
              </div>
            ) : undefined}
          </div>
          <div>
            Contributions from <b>{csherCount}</b> CSHer
            {csherCount === 1 ? '' : 's'}
          </div>
        </CardSubtitle>
      </CardBody>
      <CompanyNav company={company} setDisplay={setDisplay} />
    </Card>
  );
};
