import { FormGroup, Input, Label } from 'reactstrap';

import React from 'react';

interface OfferDateInputProps {
  offerDeadline?: Date;
  setOfferDeadline: (offerDeadline: Date) => void;
}

export const OfferDeadlineInput: React.FunctionComponent<OfferDateInputProps> = ({
  offerDeadline,
  setOfferDeadline
}) => {
  return (
    <FormGroup>
      <Label for="offerDeadline">Offer Deadline</Label>
      <Input
        type="date"
        name={'offerDeadline'}
        id={'offerDeadline'}
        placeholder={'Offer Answer due by Date'}
        value={
          offerDeadline ? offerDeadline.toISOString().slice(0, 10) : undefined
        }
        onChange={event => setOfferDeadline(new Date(event.target.value))}
      />
    </FormGroup>
  );
};
