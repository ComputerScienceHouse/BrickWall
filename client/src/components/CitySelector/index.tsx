import { Button, FormGroup, Input, InputGroup, Label } from 'reactstrap';

import React from 'react';
import Select from 'react-select';
import { useCities } from '@csh/ui/api/city';
import { useToggle } from 'react-use';

type SelectVal = { value: number; label: string };

interface CitySelectorProps {
  name?: string;
  onChange: (value: SelectVal) => void;
  newCity?: string;
  setNewCity?: (newCity: string) => void;
  newState?: string;
  setNewState?: (newState: string) => void;
  newCountry?: string;
  setNewCountry?: (newCountry: string) => void;
  remote?: boolean;
  setRemote?: (remote: boolean) => void;
}

export const CitySelector: React.FunctionComponent<CitySelectorProps> = ({
  name,
  onChange,
  newCity,
  setNewCity,
  newState,
  setNewState,
  newCountry,
  setNewCountry,
  remote,
  setRemote
}) => {
  const { cities, isLoading } = useCities();
  const [createCity, toggleCreateCity] = useToggle(cities.length == 0);

  React.useEffect(() => {
    toggleCreateCity(cities.length == 0);
  }, [cities, toggleCreateCity]);

  const cityOptions = cities.map(city => {
    return {
      label: `${city.city}, ${city.state ?? city.country}`,
      value: city.id
    };
  });

  if (!createCity) {
    return (
      <>
        <Select
          name={name}
          options={cityOptions}
          isLoading={isLoading}
          onChange={value => onChange(value as SelectVal)}
          isDisabled={remote}
        />
        <p style={{ textAlign: 'center', flex: 'auto' }}>
          Don't see the city you're looking for?{' '}
          <Button color="link" onClick={toggleCreateCity} size={'sm'}>
            Add it!
          </Button>
          {setRemote && (
            <>
              or&nbsp;&nbsp;&nbsp;
              <FormGroup check inline>
                <Label check>
                  <Input
                    type="checkbox"
                    checked={remote}
                    onChange={() => setRemote(!remote)}
                  />
                  Remote
                </Label>
              </FormGroup>
            </>
          )}
        </p>
      </>
    );
  } else if (setNewCity && setNewCountry) {
    return (
      <InputGroup>
        <Input
          value={newCity}
          placeholder={'City'}
          onChange={event => setNewCity(event.target.value)}
        />
        {setNewState && newCountry === 'United States' && (
          <Input
            value={newState}
            maxLength={2}
            placeholder={'State'}
            onChange={event => setNewState(event.target.value.toUpperCase())}
          />
        )}
        <Input
          value={newCountry}
          placeholder={'Country'}
          onChange={event => setNewCountry(event.target.value)}
        />
      </InputGroup>
    );
  } else {
    return null;
  }
};
