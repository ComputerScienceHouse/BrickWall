import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label
} from 'reactstrap';

import React from 'react';

interface RelocationInputProps {
  relocation?: number;
  setRelocation: (relocation: number) => void;
}

export const RelocationInput: React.FunctionComponent<RelocationInputProps> = ({
  relocation,
  setRelocation
}) => {
  return (
    <FormGroup>
      <Label for="offerRelocation">Relocation</Label>
      <InputGroup>
        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
        <Input
          type={'number'}
          name={'offerRelocation'}
          id={'offerRelocation'}
          placeholder={`Example: 3000 ($3000 grossed up)`}
          min={0}
          value={relocation}
          invalid={relocation ? relocation <= 0 : undefined}
          onChange={event => setRelocation(parseFloat(event.target.value))}
        />
      </InputGroup>
    </FormGroup>
  );
};
