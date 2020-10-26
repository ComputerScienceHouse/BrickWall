import React from 'react';
import { Card } from 'reactstrap';
import { Interview } from '../../api/types/interview';

interface InterviewItemProps {
  interview: Interview;
}

export const InterviewItem: React.FunctionComponent<InterviewItemProps> = ({}) => {
  return <Card style={{ marginBottom: '1.5vh' }}></Card>;
};
