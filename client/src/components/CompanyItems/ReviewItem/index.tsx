import { Card, CardBody, CardTitle } from 'reactstrap';

import { Company } from '@csh/ui/api/types/company';
import { ItemFooter } from '../ItemFooter';
import { JobReview } from '@csh/ui/api/types/jobReview';
import React from 'react';
import { UpdateJobReviewModal } from '../../JobReviewModal/UpdateJobReviewModal';

interface ReviewItemProps {
  company: Company;
  review: JobReview;
}

export const ReviewItem: React.FunctionComponent<ReviewItemProps> = ({
  review,
  company
}) => {
  return (
    <Card style={{ marginBottom: '1.5vh' }}>
      <CardBody>
        <CardTitle>
          <h3>{review.position.title}</h3>
        </CardTitle>
      </CardBody>
      <ItemFooter
        item={review}
        company={company}
        EditModal={UpdateJobReviewModal}
      />
    </Card>
  );
};
