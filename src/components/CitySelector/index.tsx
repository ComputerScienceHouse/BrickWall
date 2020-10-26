import React from 'react';
import Select from 'react-select';
import { useToggle } from 'react-use';
import { Button, Input, InputGroup } from 'reactstrap';
import { useCities } from '../../api/city';

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
}

export const CitySelector: React.FunctionComponent<CitySelectorProps> = ({
  name,
  onChange,
  newCity,
  setNewCity,
  newState,
  setNewState,
  newCountry,
  setNewCountry
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
        />
        <p style={{ textAlign: 'center', flex: 'auto' }}>
          Don't see the city you're looking for?{' '}
          <Button color="link" onClick={toggleCreateCity} size={'sm'}>
            Add it!
          </Button>
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
