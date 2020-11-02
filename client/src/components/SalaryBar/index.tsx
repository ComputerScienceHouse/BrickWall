import { Offer, PayType } from '@csh/ui/api/types/offer';

import { JobType } from '@csh/ui/api/types/position';
import { Progress } from 'reactstrap';
import React from 'react';
import { formatMoney } from '../utils';

interface SalaryBarProps {
  offers: Offer[];
  display?: JobType;
}

export const SalaryBar: React.FunctionComponent<SalaryBarProps> = ({
  offers,
  display
}) => {
  const salaries = offers
    .filter(
      offer => offer.position.job_type === display || display === undefined
    )
    .map(offer => {
      return offer.paytype === PayType.SALARY ? offer.pay : offer.pay * 52 * 40;
    });

  const avgSalary =
    salaries.length > 1
      ? salaries.reduce((a, b) => a + b, 0) / salaries.length
      : salaries.length === 1
      ? salaries[0]
      : 0;

  return (
    <div>
      <b>{formatMoney(avgSalary)}</b> ({formatMoney(avgSalary / 52 / 40)}/hr)
      <Progress
        value={avgSalary}
        min={Math.min(...salaries)}
        max={Math.max(...salaries)}
      />
    </div>
  );
};
