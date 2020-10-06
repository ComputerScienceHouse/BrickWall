import React from 'react';
import { Company } from './types/company';
import v1 from '.';

export const useCompanies = (
  headquarters: boolean = false,
  interviews: boolean = false,
  offers: boolean = false,
  reviews: boolean = false
) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [companies, setCompanies] = React.useState<Company[]>();

  React.useEffect(() => {
    setIsLoading(true);
    v1.get('/company', {
      params: { headquarters, interviews, offers, reviews }
    }).then(res => {
      setCompanies(res.data);
      setIsLoading(false);
    });
  }, [headquarters]);

  return { isLoading, companies };
};
