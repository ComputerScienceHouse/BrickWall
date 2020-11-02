import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

interface BodyInputProps {
  body: string;
  setBody: (body: string) => void;
}

export const BodyInput: React.FunctionComponent<BodyInputProps> = ({
  body,
  setBody
}) => {
  return (
    <FormGroup>
      <Label for="offerBody">Details</Label>
      <Input
        type="textarea"
        name="offerBody"
        id="offerBody"
        value={body}
        onChange={event => setBody(event.target.value)}
      />
    </FormGroup>
  );
};
