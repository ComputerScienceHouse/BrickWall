import './companyNav.scss';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import { Company } from '@csh/ui/api/types/company';
import { JobType } from '@csh/ui/api/types/position';
import React from 'react';
import { ViewSection } from '../enums';

interface CompanyNavProps {
  company?: Company;
  display?: JobType;
  setDisplay: (display?: JobType) => void;
  selection: ViewSection;
  setSelection: (selection: ViewSection) => void;
}

export const CompanyNav: React.FunctionComponent<CompanyNavProps> = ({
  company,
  setDisplay,
  selection,
  setSelection
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState<boolean>(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  const [view, setView] = React.useState('All Positions');

  React.useEffect(() => {
    if (view === 'All Positions') {
      setDisplay(undefined);
    } else if (view === 'Co-ops') {
      setDisplay(JobType.CO_OP);
    } else if (view === 'FullTime') {
      setDisplay(JobType.FULL_TIME);
    }
  }, [setDisplay, view]);

  return (
    <div className={'navigation'}>
      <Nav tabs>
        <NavItem>
          <NavLink
            href="#"
            active={selection === ViewSection.REVIEWS}
            onClick={() => setSelection(ViewSection.REVIEWS)}
          >
            <>
              <div className={'count'}>{company?.JobReviews?.length}</div>
              <div>Reviews</div>
            </>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href="#"
            active={selection === ViewSection.OFFERS}
            onClick={() => setSelection(ViewSection.OFFERS)}
          >
            <>
              <div className={'count'}>{company?.Offers?.length}</div>
              <div>Offers</div>
            </>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href="#"
            active={selection === ViewSection.INTERVIEWS}
            onClick={() => setSelection(ViewSection.INTERVIEWS)}
          >
            <>
              <div className={'count'}>{company?.Interviews?.length}</div>
              <div>Interviews</div>
            </>
          </NavLink>
        </NavItem>
      </Nav>
      <Nav tabs>
        <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle nav caret>
            {view}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => setView('All Positions')}>
              All Positions
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={() => setView('Co-ops')}>
              Co-ops
            </DropdownItem>
            <DropdownItem onClick={() => setView('FullTime')}>
              FullTime
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Nav>
    </div>
  );
};
