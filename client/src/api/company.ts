import { Company, CreateCompany } from './types/company';

import React from 'react';
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
  }, [companyId, headquarters, interviews, offers, reviews]);

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

export const useCreateCompany = (newCompany?: CreateCompany) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [result, setResult] = React.useState();

  React.useEffect(() => {
    if (newCompany !== undefined) {
      setIsLoading(true);
      v1.post('/company', newCompany).then(res => {
        setResult(res.data);
        setIsLoading(false);
      });
    }
  }, [newCompany]);

  return { isLoading, result };
};
