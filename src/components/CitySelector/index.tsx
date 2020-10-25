import React from 'react';
import Select from 'react-select';
import { useCities } from '../../api/city';

type SelectVal = { value: number; label: string };

interface CitySelectorProps {
  name?: string;
  onChange: (value: SelectVal) => void;
}

export const CitySelector: React.FunctionComponent<CitySelectorProps> = ({
  name,
  onChange
}) => {
  const { cities, isLoading } = useCities();

  const cityOptions = cities.map(city => {
    return {
      label: `${city.city}, ${city.state ?? city.country}`,
      value: city.id
    };
  });

  return (
    <Select
      name={name}
      options={cityOptions}
      isLoading={isLoading}
      onChange={value => onChange(value as SelectVal)}
    />
  );
};
