import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label
} from 'reactstrap';

import { PayType } from '@csh/ui/api/types/offer';
import React from 'react';

interface PayInputProps {
  pay: number | undefined;
  setPay: (pay: number) => void;
  payType: PayType;
  setPayType: (payType: PayType) => void;
}

export const PayInput: React.FunctionComponent<PayInputProps> = ({
  payType,
  pay,
  setPay,
  setPayType
}) => {
  return (
    <FormGroup>
      <Label for="offerAmount">Pay</Label>
      <InputGroup>
        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
        <Input
          type={'number'}
          name={'offerAmount'}
          id={'offerAmount'}
          placeholder={
            payType === PayType.SALARY
              ? `Example: 75000 ($75,000 a year salary)`
              : `Example: 31 ($31 an hour pay)`
          }
          min={0}
          value={pay}
          invalid={pay ? pay <= 0 : undefined}
          onChange={event => setPay(parseFloat(event.target.value))}
          required
        />
        <Input
          type="select"
          name="offerPayType"
          id="offerPayType"
          value={payType}
          style={{ maxWidth: '100px' }}
          onChange={event => {
            setPayType(
              event.target.value === PayType.SALARY
                ? PayType.SALARY
                : PayType.HOURLY
            );
          }}
        >
          <option value={PayType.SALARY}>Salary</option>
          <option value={PayType.HOURLY}>Hourly</option>
        </Input>
      </InputGroup>
    </FormGroup>
  );
};
