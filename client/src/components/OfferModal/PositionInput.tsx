import { FormGroup, Label } from 'reactstrap';

import { Company } from '@csh/ui/api/types/company';
import { JobType } from '@csh/ui/api/types/position';
import { PositionSelector } from '../PositionSelector';
import React from 'react';

interface PositionInputProps {
  company: Company;
  setOfferPositionId: (positionId: number) => void;
  offerPositionTitle?: string;
  setOfferPositionTitle?: (newPositionTitle: string) => void;
  offerPositionType?: JobType;
  setOfferPositionType?: (newPositionType: JobType) => void;
}

export const PositionInput: React.FunctionComponent<PositionInputProps> = ({
  company,
  setOfferPositionId,
  offerPositionTitle,
  setOfferPositionTitle,
  offerPositionType,
  setOfferPositionType
}) => {
  const onPositionSelect = ({ value }: { value: number }) => {
    setOfferPositionId(value);
  };
  return (
    <FormGroup>
      <Label for="offerPosition">Offer Position</Label>
      <PositionSelector
        name={'offerPosition'}
        company={company}
        onChange={onPositionSelect}
        newPositionTitle={offerPositionTitle}
        setNewPositionTitle={setOfferPositionTitle}
        newPositionType={offerPositionType}
        setNewPositionType={setOfferPositionType}
      />
    </FormGroup>
  );
};
