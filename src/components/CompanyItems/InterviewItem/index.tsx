import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Company } from '../../../api/types/company';
import { Interview } from '../../../api/types/interview';
import { ItemFooter } from '../ItemFooter';

interface InterviewItemProps {
  company: Company;
  interview: Interview;
}

export const InterviewItem: React.FunctionComponent<InterviewItemProps> = ({
  interview,
  company
}) => {
  return (
    <Card style={{ marginBottom: '1.5vh' }}>
      <CardBody>
        <CardTitle>
          <h3>{interview.position.title}</h3>
        </CardTitle>
        {interview.body}
      </CardBody>
      <ItemFooter item={interview} company={company} />
    </Card>
  );
};
