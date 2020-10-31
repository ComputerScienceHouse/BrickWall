import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { JobReview } from '../../../api/types/jobReview';
import { ItemFooter } from '../ItemFooter';

interface ReviewItemProps {
  review: JobReview;
}

export const ReviewItem: React.FunctionComponent<ReviewItemProps> = ({
  review
}) => {
  return (
    <Card style={{ marginBottom: '1.5vh' }}>
      <CardBody>
        <CardTitle>
          <h3>{review.position.title}</h3>
        </CardTitle>
      </CardBody>
      <ItemFooter item={review} />
    </Card>
  );
};
