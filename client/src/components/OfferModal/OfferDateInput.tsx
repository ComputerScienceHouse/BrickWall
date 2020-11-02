import { FormGroup, Input, Label } from 'reactstrap';

import React from 'react';

interface OfferDateInputProps {
  offerDate?: Date;
  setOfferDate: (offerDate: Date) => void;
}

export const OfferDateInput: React.FunctionComponent<OfferDateInputProps> = ({
  offerDate,
  setOfferDate
}) => {
  return (
    <FormGroup>
      <Label for="offerDate">Offer Date</Label>
      <Input
        type={'date'}
        name={'offerDate'}
        id={'offerDate'}
        placeholder={'Offer Date'}
        value={offerDate ? offerDate.toISOString().slice(0, 10) : undefined}
        onChange={event => setOfferDate(new Date(event.target.value))}
      />
    </FormGroup>
  );
};
