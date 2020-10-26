import React from 'react';
import { Position } from './types/position';
import v1 from '.';

export const usePositions = (companyId: number) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [positions, setPositions] = React.useState<Position[]>([]);

  React.useEffect(() => {
    setIsLoading(true);
    v1.get(`/position/${companyId}`).then(res => {
      setPositions(res.data);
      setIsLoading(false);
    });
  }, [companyId]);

  return { isLoading, positions };
};
