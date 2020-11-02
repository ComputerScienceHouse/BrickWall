import { CreateOffer, UpdateOffer } from './types/offer';

import React from 'react';
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

export const useUpdateOffer = (offerId: number, updateOffer?: UpdateOffer) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [result, setResult] = React.useState();

  React.useEffect(() => {
    if (updateOffer !== undefined) {
      setIsLoading(true);
      v1.put(`/offer/${offerId}`, updateOffer).then(res => {
        setResult(res.data);
        setIsLoading(false);
      });
    }
  }, [offerId, updateOffer]);

  return { isLoading, result };
};
