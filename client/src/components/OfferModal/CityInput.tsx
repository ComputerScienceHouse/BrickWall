import { FormGroup, Label } from 'reactstrap';

import { CitySelector } from '../CitySelector';
import React from 'react';

interface CityInputProps {
  setLocationId: (offerLocationId: number) => void;
  newCity?: string;
  setNewCity: (newCity: string) => void;
  newState?: string;
  setNewState: (newState: string) => void;
  newCountry?: string;
  setNewCountry: (newCountry: string) => void;
  remote?: boolean;
  setRemote: (remote: boolean) => void;
}

export const CityInput: React.FunctionComponent<CityInputProps> = ({
  setLocationId,
  newCity,
  setNewCity,
  newState,
  setNewState,
  newCountry,
  setNewCountry,
  remote,
  setRemote
}) => {
  const onCitySelect = ({ value }: { value: number }) => {
    setLocationId(value);
  };
  return (
    <FormGroup>
      <Label for="offerLocation">Offer Location</Label>
      <CitySelector
        name={'offerLocation'}
        onChange={onCitySelect}
        newCity={newCity}
        setNewCity={setNewCity}
        newState={newState}
        setNewState={setNewState}
        newCountry={newCountry}
        setNewCountry={setNewCountry}
        remote={remote}
        setRemote={setRemote}
      />
    </FormGroup>
  );
};
