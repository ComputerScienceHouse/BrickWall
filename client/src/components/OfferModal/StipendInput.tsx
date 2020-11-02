import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label
} from 'reactstrap';

import { Housing } from '@csh/ui/api/types/offer';
import React from 'react';

interface StipendInputProps {
  stipend: number | undefined;
  setStipend: (stipend: number) => void;
  housing: Housing | undefined;
}

export const StipendInput: React.FunctionComponent<StipendInputProps> = ({
  stipend,
  setStipend,
  housing
}) => {
  return (
    <FormGroup>
      <Label for="offerStipend">Stipend</Label>
      <InputGroup>
        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
        <Input
          type={'number'}
          name={'offerStipend'}
          id={'offerStipend'}
          placeholder={`Example: 1000 ($1,000 a month stipend)`}
          min={0}
          value={stipend}
          invalid={
            stipend
              ? stipend <= 0
              : housing === Housing.STIPEND
              ? stipend === undefined
              : undefined
          }
          onChange={event => setStipend(parseFloat(event.target.value))}
          required={housing === Housing.STIPEND}
        />
      </InputGroup>
    </FormGroup>
  );
};
