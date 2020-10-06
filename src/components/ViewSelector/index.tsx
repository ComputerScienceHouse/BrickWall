import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable, faThLarge } from '@fortawesome/free-solid-svg-icons';

export const ViewSelector: React.FunctionComponent = () => {
  const [selectedView, setSelectedView] = React.useState(1);

  return (
    <ButtonGroup>
      <Button
        outline
        color="secondary"
        size={'sm'}
        onClick={() => setSelectedView(1)}
        active={selectedView === 1}
      >
        <FontAwesomeIcon icon={faThLarge} />
      </Button>
      <Button
        outline
        color="secondary"
        size={'sm'}
        onClick={() => setSelectedView(2)}
        active={selectedView === 2}
      >
        <FontAwesomeIcon icon={faTable} />
      </Button>
    </ButtonGroup>
  );
};
