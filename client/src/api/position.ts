import { JobPosition } from './types/position';
import React from 'react';
import v1 from '.';

export const usePositions = (companyId: number) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [positions, setPositions] = React.useState<JobPosition[]>([]);

  React.useEffect(() => {
    setIsLoading(true);
    v1.get(`/position/${companyId}`).then(res => {
      setPositions(res.data);
      setIsLoading(false);
    });
  }, [companyId]);

  return { isLoading, positions };
};
