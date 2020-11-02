import React from 'react';
import { Tooltip } from 'reactstrap';

interface TooltipHoverProps {
  idName: string;
  label: React.ReactNode;
}

export const TooltipHover: React.FunctionComponent<TooltipHoverProps> = ({
  children,
  label,
  idName
}) => {
  const [tooltipOpen, setTooltipOpen] = React.useState<boolean>(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  return (
    <>
      <span id={idName}>{children}</span>
      <Tooltip
        placement={'top'}
        target={idName}
        toggle={toggle}
        isOpen={tooltipOpen}
      >
        {label}
      </Tooltip>
    </>
  );
};
