import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  InputGroup
} from 'reactstrap';
import { useReactOidc } from '@axa-fr/react-oidc-context';
import { CreateOffer, Housing, PayType } from '../../api/types/offer';
import { CitySelector } from '../CitySelector';
import { PositionSelector } from '../PositionSelector';
import { useCreateOffer } from '../../api/offer';
import { Company } from '../../api/types/company';
import { JobType } from '../../api/types/position';
import { PayInput } from './PayInput';
import { StipendInput } from './StipendInput';
import { HousingInput } from './HousingInput';

interface CreateOfferModalProps {
  isOpen: boolean;
  toggle: () => void;
  company: Company;
}

export const CreateOfferModal: React.FunctionComponent<CreateOfferModalProps> = ({
  isOpen,
  toggle,
  company
}) => {
  const [newOffer, setNewOffer] = React.useState<CreateOffer>();
  const [pay, setPay] = React.useState<number>();
  const [payType, setPayType] = React.useState<PayType>(PayType.SALARY);
  const [stipend, setStipend] = React.useState<number>();
  const [signing, setSigning] = React.useState<number>();
  const [stocks, setStocks] = React.useState<number>();
  const [relocation, setRelocation] = React.useState<number>();
  const [housing, setHousing] = React.useState<Housing>();
  const [offerDate, setOfferDate] = React.useState<Date>();
  const [offerDeadline, setOfferDeadline] = React.useState<Date>();
  const [remote, setRemote] = React.useState<boolean>(false);
  const [body, setBody] = React.useState<string>();

  const [offerPositionId, setOfferPositionId] = React.useState<number>();
  const [offerPositionTitle, setOfferPositionTitle] = React.useState<string>(
    'Software Engineer Intern'
  );
  const [offerPositionType, setOfferPositionType] = React.useState<JobType>(
    JobType.CO_OP
  );

  const [offerLocationId, setOfferLocationId] = React.useState<number>();
  const [offerLocationCity, setOfferLocationCity] = React.useState<string>(
    'Rochester'
  );
  const [offerLocationState, setOfferLocationState] = React.useState<string>(
    'NY'
  );
  const [offerLocationCountry, setOfferLocationCountry] = React.useState<
    string
  >('United States');

  const { oidcUser } = useReactOidc();
  useCreateOffer(newOffer);

  if (!oidcUser) return null;

  const {
    profile: { preferred_username }
  } = oidcUser;

  const createNewOffer = () => {
    if (
      preferred_username !== undefined &&
      pay !== undefined &&
      payType !== undefined
    ) {
      const offerPosition = offerPositionId
        ? { connect: { id: offerPositionId } }
        : {
            create: {
              company: { connect: { id: company.id } },
              title: offerPositionTitle,
              job_type: offerPositionType
            }
          };
      setNewOffer({
        member: preferred_username,
        pay: pay,
        paytype: payType,
        company: { connect: { id: company.id } },
        position: offerPosition,
        location: !remote
          ? offerLocationId
            ? { connect: { id: offerLocationId } }
            : {
                create: {
                  city: offerLocationCity,
                  state:
                    offerLocationCountry === 'United States'
                      ? offerLocationState
                      : undefined,
                  country: offerLocationCountry
                }
              }
          : undefined,
        remote: remote,
        offerdate: offerDate,
        offerdeadline: offerDeadline,
        stipend: stipend && stipend >= 0 ? stipend : undefined,
        stocks: stocks && stocks >= 0 ? stocks : undefined,
        relocation: relocation && relocation >= 0 ? relocation : undefined,
        housing: housing,
        body: body
      });
      toggle();
    }
  };

  const onCitySelect = ({ value }: { value: number }) => {
    setOfferLocationId(value);
  };

  const onPositionSelect = ({ value }: { value: number }) => {
    setOfferPositionId(value);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Offer</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="offerPosition">Offer Position</Label>
            <PositionSelector
              name={'offerPosition'}
              company={company}
              onChange={onPositionSelect}
              newPositionTitle={offerPositionTitle}
              setNewPositionTitle={setOfferPositionTitle}
              newPositionType={offerPositionType}
              setNewPositionType={setOfferPositionType}
            />
          </FormGroup>
          <PayInput
            pay={pay}
            setPay={setPay}
            payType={payType}
            setPayType={setPayType}
          />
          <FormGroup>
            <Label for="offerLocation">Offer Location</Label>
            <CitySelector
              name={'offerLocation'}
              onChange={onCitySelect}
              newCity={offerLocationCity}
              setNewCity={setOfferLocationCity}
              newState={offerLocationState}
              setNewState={setOfferLocationState}
              newCountry={offerLocationCountry}
              setNewCountry={setOfferLocationCountry}
              remote={remote}
              setRemote={setRemote}
            />
          </FormGroup>
          <FormGroup>
            <Label for="offerDate">Offer Date</Label>
            <Input
              type={'date'}
              name={'offerDate'}
              id={'offerDate'}
              placeholder={'Offer Date'}
              value={
                offerDate ? offerDate.toISOString().slice(0, 10) : undefined
              }
              onChange={event => setOfferDate(new Date(event.target.value))}
            />
          </FormGroup>
          <FormGroup>
            <Label for="offerDeadline">Offer Deadline</Label>
            <Input
              type="date"
              name={'offerDeadline'}
              id={'offerDeadline'}
              placeholder={'Offer Answer due by Date'}
              value={
                offerDeadline
                  ? offerDeadline.toISOString().slice(0, 10)
                  : undefined
              }
              onChange={event => setOfferDeadline(new Date(event.target.value))}
            />
          </FormGroup>
          <FormGroup>
            <Label for="offerStocks">Stocks</Label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">$</InputGroupAddon>
              <Input
                type={'number'}
                name={'offerStocks'}
                id={'offerStocks'}
                placeholder={`Example: 100000 ($100,000 RSU award at start date)`}
                min={0}
                value={stocks}
                invalid={stocks ? stocks <= 0 : undefined}
                onChange={event => setStocks(parseFloat(event.target.value))}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label for="offerSigning">Signing Bonus</Label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">$</InputGroupAddon>
              <Input
                type={'number'}
                name={'offerSigning'}
                id={'offerSigning'}
                placeholder={`Example: 10000 ($10,000 signing bonus)`}
                min={0}
                value={signing}
                invalid={signing ? signing <= 0 : undefined}
                onChange={event => setSigning(parseFloat(event.target.value))}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label for="offerRelocation">Relocation</Label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">$</InputGroupAddon>
              <Input
                type={'number'}
                name={'offerRelocation'}
                id={'offerRelocation'}
                placeholder={`Example: 3000 ($3000 grossed up)`}
                min={0}
                value={relocation}
                invalid={relocation ? relocation <= 0 : undefined}
                onChange={event =>
                  setRelocation(parseFloat(event.target.value))
                }
              />
            </InputGroup>
          </FormGroup>
          <HousingInput housing={housing} setHousing={setHousing} />
          <StipendInput
            stipend={stipend}
            setStipend={setStipend}
            housing={housing}
          />
          <FormGroup>
            <Label for="offerBody">Details</Label>
            <Input
              type="textarea"
              name="offerBody"
              id="offerBody"
              value={body}
              onChange={event => setBody(event.target.value)}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={createNewOffer}
          disabled={pay === undefined}
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
