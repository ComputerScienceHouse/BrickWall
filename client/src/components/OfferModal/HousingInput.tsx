import { FormGroup, Input, Label } from 'reactstrap';

import { Housing } from '@csh/ui/api/types/offer';
import React from 'react';

interface HousingInputProps {
  housing: Housing | undefined;
  setHousing: (housing: Housing | undefined) => void;
}

export const HousingInput: React.FunctionComponent<HousingInputProps> = ({
  housing,
  setHousing
}) => {
  return (
    <FormGroup>
      <Label for="offerHousing">Housing</Label>
      <Input
        type="select"
        name="offerHousing"
        id="offerHousing"
        value={housing}
        defaultValue={undefined}
        onChange={event => {
          setHousing(
            event.target.value === Housing.CORPORATE
              ? Housing.CORPORATE
              : event.target.value === Housing.STIPEND
              ? Housing.STIPEND
              : undefined
          );
        }}
      >
        <option value={undefined}>None</option>
        <option value={Housing.CORPORATE}>Corporate Housing</option>
        <option value={Housing.STIPEND}>Housing Stipend</option>
      </Input>
    </FormGroup>
  );
};
