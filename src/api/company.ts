import React from 'react';
import { Company } from './types/company';
import v1 from '.';

export const useCompany = (
  companyId: number,
  headquarters: boolean = false,
  interviews: boolean = false,
  offers: boolean = false,
  reviews: boolean = false
) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [company, setCompany] = React.useState<Company>();

  React.useEffect(() => {
    setIsLoading(true);
    v1.get(`/company/${companyId}`, {
      params: { headquarters, interviews, offers, reviews }
    }).then(res => {
      setCompany(res.data);
      setIsLoading(false);
    });
  }, [headquarters, interviews, offers, reviews]);

  return { isLoading, company };
};

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
  }, [headquarters, interviews, offers, reviews]);

  return { isLoading, companies };
};
