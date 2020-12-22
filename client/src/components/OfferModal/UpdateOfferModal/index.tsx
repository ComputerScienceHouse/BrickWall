import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import { Housing, Offer, PayType, UpdateOffer } from '@csh/ui/api/types/offer';

import { BodyInput } from '../BodyInput';
import { CityInput } from '../CityInput';
import { Company } from '@csh/ui/api/types/company';
import { HousingInput } from '../HousingInput';
import { JobType } from '@csh/ui/api/types/position';
import { OfferDateInput } from '../OfferDateInput';
import { OfferDeadlineInput } from '../OfferDeadlineInput';
import { PayInput } from '../PayInput';
import { PositionInput } from '../PositionInput';
import React from 'react';
import { RelocationInput } from '../RelocationInput';
import { SigningInput } from '../SigningInput';
import { StipendInput } from '../StipendInput';
import { StocksInput } from '../StocksInput';
import { useReactOidc } from '@axa-fr/react-oidc-context';
import { useUpdateOffer } from '@csh/ui/api/offer';

export interface UpdateOfferModalProps {
  isOpen: boolean;
  toggle: () => void;
  company: Company;
  item: Offer;
}

export const UpdateOfferModal: React.FunctionComponent<UpdateOfferModalProps> = ({
  isOpen,
  toggle,
  company,
  item: offer
}) => {
  const [updateOffer, setUpdateOffer] = React.useState<UpdateOffer>();
  const [pay, setPay] = React.useState<number>(offer.pay);
  const [payType, setPayType] = React.useState<PayType>(offer.paytype);
  const [stipend, setStipend] = React.useState<number | undefined>(
    offer.stipend ? offer.stipend : undefined
  );
  const [signing, setSigning] = React.useState<number | undefined>(
    offer.signing_bonus ?? undefined
  );
  const [stocks, setStocks] = React.useState<number | undefined>(
    offer.stocks ?? undefined
  );
  const [relocation, setRelocation] = React.useState<number | undefined>(
    offer.relocation ? offer.relocation : undefined
  );
  const [housing, setHousing] = React.useState<Housing | undefined>(
    offer.housing
  );
  const [offerDate, setOfferDate] = React.useState<Date | undefined>(
    offer.offerdate ? new Date(offer.offerdate) : undefined
  );
  const [offerDeadline, setOfferDeadline] = React.useState<Date | undefined>(
    offer.offerdeadline ? new Date(offer.offerdeadline) : undefined
  );
  const [remote, setRemote] = React.useState<boolean>(offer.remote);
  const [body, setBody] = React.useState<string | undefined>(
    offer.body ?? undefined
  );

  const [offerPositionId, setOfferPositionId] = React.useState<number>(
    offer.position.id
  );
  const [offerPositionTitle, setOfferPositionTitle] = React.useState<string>(
    offer.position.title
  );
  const [offerPositionType, setOfferPositionType] = React.useState<JobType>(
    offer.position.job_type
  );

  const [offerLocationId, setOfferLocationId] = React.useState<
    number | undefined
  >(offer.location?.id);
  const [offerLocationCity, setOfferLocationCity] = React.useState<string>(
    offer.location?.city ?? 'Rochester'
  );
  const [offerLocationState, setOfferLocationState] = React.useState<string>(
    offer.location?.state ?? 'NY'
  );
  const [
    offerLocationCountry,
    setOfferLocationCountry
  ] = React.useState<string>(offer.location?.country ?? 'United States');

  const { oidcUser } = useReactOidc();
  useUpdateOffer(offer.id, updateOffer);

  if (!oidcUser) return null;

  const {
    profile: { preferred_username }
  } = oidcUser;

  const onUpdateOffer = () => {
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
      setUpdateOffer({
        member:
          preferred_username !== offer.member ? preferred_username : undefined,
        pay: pay !== offer.pay ? pay : undefined,
        paytype: payType !== offer.paytype ? payType : undefined,
        company: { connect: { id: company.id } },
        position:
          offerPositionId !== offer.position.id ? offerPosition : undefined,
        location:
          offerLocationId !== offer.location?.id
            ? !remote
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
              : undefined
            : undefined,
        remote: remote !== offer.remote ? remote : undefined,
        offerdate: offerDate !== undefined ? new Date(offerDate) : undefined,
        offerdeadline:
          offerDeadline !== undefined ? new Date(offerDeadline) : undefined,
        stipend:
          stipend !== offer.stipend
            ? stipend && stipend >= 0
              ? stipend
              : undefined
            : undefined,
        signing_bonus:
          signing !== offer.signing_bonus
            ? signing && signing >= 0
              ? signing
              : undefined
            : undefined,
        stocks:
          stocks !== offer.stocks
            ? stocks && stocks >= 0
              ? stocks
              : undefined
            : undefined,
        relocation:
          relocation !== offer.relocation
            ? relocation && relocation >= 0
              ? relocation
              : undefined
            : undefined,
        housing: housing !== offer.housing ? housing : undefined,
        body: body !== offer.body ? body ?? undefined : undefined
      });
      toggle();
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Update Offer for {company.name}</ModalHeader>
      <ModalBody>
        <Form>
          <PositionInput
            company={company}
            setOfferPositionId={setOfferPositionId}
            offerPositionTitle={offerPositionTitle}
            setOfferPositionTitle={setOfferPositionTitle}
            offerPositionType={offerPositionType}
            setOfferPositionType={setOfferPositionType}
          />
          <PayInput
            pay={pay}
            setPay={setPay}
            payType={payType}
            setPayType={setPayType}
          />
          <CityInput
            setLocationId={setOfferLocationId}
            newCity={offerLocationCity}
            setNewCity={setOfferLocationCity}
            newState={offerLocationState}
            setNewState={setOfferLocationState}
            newCountry={offerLocationCountry}
            setNewCountry={setOfferLocationCountry}
            remote={remote}
            setRemote={setRemote}
          />
          <OfferDateInput offerDate={offerDate} setOfferDate={setOfferDate} />
          <OfferDeadlineInput
            offerDeadline={offerDeadline}
            setOfferDeadline={setOfferDeadline}
          />
          <StocksInput stocks={stocks} setStocks={setStocks} />
          <SigningInput signing={signing} setSigning={setSigning} />
          <RelocationInput
            relocation={relocation}
            setRelocation={setRelocation}
          />
          <HousingInput housing={housing} setHousing={setHousing} />
          <StipendInput
            stipend={stipend}
            setStipend={setStipend}
            housing={housing}
          />
          <BodyInput body={body} setBody={setBody} />
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onUpdateOffer}>
          Update
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
