import React from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  Row
} from 'reactstrap';
import { Company } from '../../api/types/company';
import { JobType } from '../../api/types/position';

import './companyNav.scss';

interface CompanyNavProps {
  company?: Company;
  display?: JobType;
  setDisplay: (display?: JobType) => void;
}

export const CompanyNav: React.FunctionComponent<CompanyNavProps> = ({
  company,
  display,
  setDisplay
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
  }, [view]);

  return (
    <div className={'navigation'}>
      <Nav tabs>
        <NavItem>
          <NavLink href="#" active>
            <>
              <div className={'count'}>{company?.JobReviews?.length}</div>
              <div>Reviews</div>
            </>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">
            <>
              <div className={'count'}>{company?.Offers?.length}</div>
              <div>Offers</div>
            </>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">
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
