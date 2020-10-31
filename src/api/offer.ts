import React from 'react';
import { CreateOffer } from './types/offer';
import v1 from '.';

export const useCreateOffer = (newOffer?: CreateOffer) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [result, setResult] = React.useState();

  React.useEffect(() => {
    if (newOffer !== undefined) {
      setIsLoading(true);
      v1.post('/offer', newOffer).then(res => {
        setResult(res.data);
        setIsLoading(false);
      });
    }
  }, [newOffer]);

  return { isLoading, result };
};
