import { Button, Input, InputGroup } from 'reactstrap';

import { Company } from '@csh/ui/api/types/company';
import { JobType } from '@csh/ui/api/types/position';
import React from 'react';
import Select from 'react-select';
import { usePositions } from '@csh/ui/api/position';
import { useToggle } from 'react-use';

export type SelectVal = { value: number; label: string };

interface PositionSelectorProps {
  name?: string;
  company: Company;
  onChange: (value: SelectVal) => void;
  newPositionTitle?: string;
  setNewPositionTitle?: (newPositionTitle: string) => void;
  newPositionType?: JobType;
  setNewPositionType?: (newPositionType: JobType) => void;
}

export const PositionSelector: React.FunctionComponent<PositionSelectorProps> = ({
  name,
  onChange,
  company,
  newPositionTitle,
  setNewPositionTitle,
  newPositionType,
  setNewPositionType
}) => {
  const { positions, isLoading } = usePositions(company.id);
  const [createPosition, toggleCreatePosition] = useToggle(
    positions.length == 0
  );

  React.useEffect(() => {
    toggleCreatePosition(positions.length == 0);
  }, [positions, toggleCreatePosition]);

  const positionOptions = positions.map(position => {
    return {
      label: `${position.title}${
        position.job_type === JobType.CO_OP ? ` (Co-Op)` : ' (Fulltime)'
      }`,
      value: position.id
    };
  });

  if (positionOptions.length >= 1 && !createPosition) {
    return (
      <>
        <Select
          name={name}
          options={positionOptions}
          isLoading={isLoading}
          onChange={value => onChange(value as SelectVal)}
        />
        <p style={{ textAlign: 'center', flex: 'auto' }}>
          Don't see the position you're looking for?{' '}
          <Button color="link" onClick={toggleCreatePosition} size={'sm'}>
            Add it!
          </Button>
        </p>
      </>
    );
  } else if (setNewPositionTitle && setNewPositionType) {
    return (
      <InputGroup>
        <Input
          value={newPositionTitle}
          onChange={event => setNewPositionTitle(event.target.value)}
        />
        <Input
          type={'select'}
          name={'newPositionTypeSelector'}
          id={'newPositionTypeSelector'}
          value={newPositionType}
          onChange={event => {
            setNewPositionType(
              event.target.value === JobType.CO_OP
                ? JobType.CO_OP
                : JobType.FULL_TIME
            );
          }}
        >
          <option value={JobType.CO_OP}>Co-Op/Internship</option>
          <option value={JobType.FULL_TIME}>FullTime</option>
        </Input>
      </InputGroup>
    );
  } else {
    return null;
  }
};
