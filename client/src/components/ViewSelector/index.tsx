import { Button, ButtonGroup } from 'reactstrap';
import { faTable, faThLarge } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

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
