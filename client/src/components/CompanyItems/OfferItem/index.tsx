import './offerItem.scss';

import { Card, CardBody, CardSubtitle, CardTitle, Table } from 'reactstrap';
import { Offer, PayType } from '@csh/ui/api/types/offer';
import {
  faLaptopHouse,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';

import { Company } from '@csh/ui/api/types/company';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ItemFooter } from '../ItemFooter';
import React from 'react';
import { UpdateOfferModal } from '../../OfferModal/UpdateOfferModal';
import { formatMoney } from '../../utils';

interface OfferProps {
  company: Company;
  offer: Offer;
}

export const OfferItem: React.FunctionComponent<OfferProps> = ({
  offer,
  company
}) => {
  return (
    <Card style={{ marginBottom: '1.5vh' }}>
      <CardBody>
        <CardTitle>
          <h3>{offer.position.title}</h3>
        </CardTitle>
        <CardSubtitle>
          <div>
            <div className={'location'}>
              &nbsp;
              {offer.location ? (
                <div>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  &nbsp;
                  {offer.location.city},{' '}
                  {offer.location.state
                    ? offer.location.state
                    : offer.location.country}
                </div>
              ) : undefined}
              {offer.location && offer.remote && <>&nbsp;&bull;&nbsp;</>}
              {offer.remote ? (
                <div>
                  <FontAwesomeIcon icon={faLaptopHouse} />
                  &nbsp; Remote
                </div>
              ) : undefined}
              &nbsp;
            </div>
          </div>
          {offer.offerdate || offer.offerdeadline ? (
            <div className={'offer-dates'}>
              <div>
                &nbsp;
                {offer.offerdate ? (
                  <>
                    <b>Offer Date:</b>{' '}
                    {new Date(offer.offerdate).toLocaleDateString()}
                  </>
                ) : null}
                &nbsp;
              </div>
              <div>
                &nbsp;{' '}
                {offer.offerdeadline ? (
                  <>
                    <b>Offer Deadline:</b>{' '}
                    {new Date(offer.offerdeadline).toLocaleDateString()}
                  </>
                ) : null}
                &nbsp;
              </div>
            </div>
          ) : null}
        </CardSubtitle>
        <Table>
          <tbody>
            {offer.pay ? (
              <tr>
                <td>Pay</td>
                <td>
                  {formatMoney(offer.pay)}
                  {offer.paytype === PayType.HOURLY
                    ? '/hr'
                    : offer.paytype === PayType.SALARY && '/yr'}
                </td>
              </tr>
            ) : null}
            {offer.housing ? (
              <tr>
                <td>Housing</td>
                <td>{offer.housing}</td>
              </tr>
            ) : null}
            {offer.stipend ? (
              <tr>
                <td>Stipend</td>
                <td>{formatMoney(offer.stipend)}</td>
              </tr>
            ) : null}
            {offer.stocks ? (
              <tr>
                <td>Stocks</td>
                <td>{formatMoney(offer.stocks)}</td>
              </tr>
            ) : null}
            {offer.signing_bonus ? (
              <tr>
                <td>Signing Bonus</td>
                <td>{formatMoney(offer.signing_bonus)}</td>
              </tr>
            ) : null}
            {offer.relocation ? (
              <tr>
                <td>Relocation</td>
                <td>{formatMoney(offer.relocation)}</td>
              </tr>
            ) : null}
          </tbody>
        </Table>
        {offer.body}
      </CardBody>
      <ItemFooter item={offer} company={company} EditModal={UpdateOfferModal} />
    </Card>
  );
};
