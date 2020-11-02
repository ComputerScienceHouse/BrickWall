import { CreateInterview } from './types/interview';
import React from 'react';
import v1 from '.';

export const useCreateInterview = (newInterview?: CreateInterview) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [result, setResult] = React.useState();

  React.useEffect(() => {
    if (newInterview !== undefined) {
      setIsLoading(true);
      v1.post('/interview', newInterview).then(res => {
        setResult(res.data);
        setIsLoading(false);
      });
    }
  }, [newInterview]);

  return { isLoading, result };
};
