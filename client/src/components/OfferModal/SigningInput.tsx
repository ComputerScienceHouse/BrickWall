import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label
} from 'reactstrap';

import React from 'react';

interface SigningInputProps {
  signing?: number;
  setSigning: (signing: number) => void;
}

export const SigningInput: React.FunctionComponent<SigningInputProps> = ({
  signing,
  setSigning
}) => {
  return (
    <FormGroup>
      <Label for="offerSigning">Signing Bonus</Label>
      <InputGroup>
        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
        <Input
          type={'number'}
          name={'offerSigning'}
          id={'offerSigning'}
          placeholder={`Example: 10000 ($10,000 signing bonus)`}
          min={0}
          value={signing}
          invalid={signing ? signing <= 0 : undefined}
          onChange={event => setSigning(parseFloat(event.target.value))}
        />
      </InputGroup>
    </FormGroup>
  );
};
