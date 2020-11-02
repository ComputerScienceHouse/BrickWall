import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label
} from 'reactstrap';

import React from 'react';

interface StocksInputProps {
  stocks?: number;
  setStocks: (stocks: number) => void;
}

export const StocksInput: React.FunctionComponent<StocksInputProps> = ({
  stocks,
  setStocks
}) => {
  return (
    <FormGroup>
      <Label for="offerStocks">Stocks</Label>
      <InputGroup>
        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
        <Input
          type={'number'}
          name={'offerStocks'}
          id={'offerStocks'}
          placeholder={`Example: 100000 ($100,000 RSU award at start date)`}
          min={0}
          value={stocks}
          invalid={stocks ? stocks <= 0 : undefined}
          onChange={event => setStocks(parseFloat(event.target.value))}
        />
      </InputGroup>
    </FormGroup>
  );
};
