import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';

import { CitySelector } from '../CitySelector';
import { CreateCompany } from '@csh/ui/api/types/company';
import React from 'react';
import { useCreateCompany } from '@csh/ui/api/company';

interface CreateCompanyModalProps {
  isOpen: boolean;
  toggle: () => void;
}

export const CreateCompanyModal: React.FunctionComponent<CreateCompanyModalProps> = ({
  isOpen,
  toggle
}) => {
  const [newCompany, setNewCompany] = React.useState<CreateCompany>();
  useCreateCompany(newCompany);

  const [companyName, setCompanyName] = React.useState<string>('');
  const [companyWebsite, setCompanyWebsite] = React.useState<string>('');
  const [
    companyHeadquartersId,
    setCompanyHeadquartersId
  ] = React.useState<number>();
  const [createCompanyCity, setCreateCompanyCity] = React.useState<string>(
    'Rochester'
  );
  const [createCompanyState, setCreateCompanyState] = React.useState<string>(
    'NY'
  );
  const [
    createCompanyCountry,
    setCreateCompanyCountry
  ] = React.useState<string>('United States');

  const createNewCompany = () => {
    if (companyName !== '' && companyWebsite !== '') {
      setNewCompany({
        name: companyName,
        website: companyWebsite,
        headquarters: companyHeadquartersId
          ? { connect: { id: companyHeadquartersId } }
          : {
              create: {
                city: createCompanyCity,
                state:
                  createCompanyCountry === 'United States'
                    ? createCompanyState
                    : undefined,
                country: createCompanyCountry
              }
            }
      });
      toggle();
    }
  };

  const onCitySelect = ({ value }: { value: number }) => {
    setCompanyHeadquartersId(value);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Company</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="companyName">Company Name</Label>
            <Input
              type={'text'}
              name={'companyName'}
              id={'companyName'}
              placeholder={`${companyName !== '' ? companyName : 'Google'}`}
              onChange={event => setCompanyName(event.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="companyWebsite">Company Website</Label>
            <Input
              type={'text'}
              name={'companyWebsite'}
              id={'companyWebsite'}
              placeholder={`https://${
                companyName !== '' ? companyName.toLowerCase() : 'google'
              }.com`}
              onChange={event => setCompanyWebsite(event.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="companyHeadquarters">Company Headquarters</Label>
            <CitySelector
              name={'companyHeadquarters'}
              onChange={onCitySelect}
              newCity={createCompanyCity}
              setNewCity={setCreateCompanyCity}
              newState={createCompanyState}
              setNewState={setCreateCompanyState}
              newCountry={createCompanyCountry}
              setNewCountry={setCreateCompanyCountry}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={createNewCompany}
          disabled={companyName === '' || companyWebsite === ''}
        >
          Create
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
