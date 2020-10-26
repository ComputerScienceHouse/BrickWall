import React from 'react';
import { Card } from 'reactstrap';
import { JobReview } from '../../api/types/jobReview';

interface ReviewItemProps {
  review: JobReview;
}

export const ReviewItem: React.FunctionComponent<ReviewItemProps> = ({}) => {
  return <Card style={{ marginBottom: '1.5vh' }}></Card>;
};
