import { City } from './types/city';
import React from 'react';
import v1 from '.';

export const useCities = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [cities, setCities] = React.useState<City[]>([]);

  React.useEffect(() => {
    setIsLoading(true);
    v1.get('/city').then(res => {
      setCities(res.data);
      setIsLoading(false);
    });
  }, []);

  return { isLoading, cities };
};
