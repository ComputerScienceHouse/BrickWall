import { Card, CardBody, CardTitle } from 'reactstrap';

import { Company } from '@csh/ui/api/types/company';
import { Interview } from '@csh/ui/api/types/interview';
import { ItemFooter } from '../ItemFooter';
import React from 'react';
import { UpdateInterviewModal } from '../../InterviewModal/UpdateInterviewModal';

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
      <ItemFooter
        item={interview}
        company={company}
        EditModal={UpdateInterviewModal}
      />
    </Card>
  );
};
