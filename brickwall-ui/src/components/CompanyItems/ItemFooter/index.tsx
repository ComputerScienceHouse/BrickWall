import { useReactOidc } from '@axa-fr/react-oidc-context';
import React, { FunctionComponent } from 'react';
import { useToggle } from 'react-use';
import { Button, CardFooter } from 'reactstrap';
import { Interview } from '../../../api/types/interview';
import { JobReview } from '../../../api/types/jobReview';
import { Offer } from '../../../api/types/offer';
import { UpdateOfferModalProps } from '../../OfferModal/UpdateOfferModal';
import { UpdateInterviewModalProps } from '../../InterviewModal/UpdateInterviewModal';
import { UpdateJobReviewModalProps } from '../../JobReviewModal/UpdateJobReviewModal';
import { Company } from '../../../api/types/company';

interface ItemFooterProps {
  item: JobReview | Interview | Offer;
  company: Company;
  EditModal?:
    | FunctionComponent<UpdateOfferModalProps>
    | FunctionComponent<UpdateInterviewModalProps>
    | FunctionComponent<UpdateJobReviewModalProps>;
}

export const ItemFooter: React.FunctionComponent<ItemFooterProps> = ({
  item,
  company,
  EditModal
}) => {
  const { oidcUser } = useReactOidc();

  const {
    profile: { preferred_username }
  } = oidcUser ?? { profile: {} };

  const [isEditOpen, toggleEditOpen] = useToggle(false);

  return (
    <CardFooter>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          {preferred_username === item.member && (
            <Button color="link" size={'sm'} onClick={toggleEditOpen}>
              Edit
            </Button>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <img
            className="rounded-circle"
            src={`https://profiles.csh.rit.edu/image/${item.member}`}
            alt=""
            aria-hidden={true}
            width={24}
            height={24}
          />
          &nbsp;
          {item.member}
        </div>
        {/* @ts-ignore */}
        <EditModal
          isOpen={isEditOpen}
          toggle={toggleEditOpen}
          item={item}
          company={company}
        />
      </div>
    </CardFooter>
  );
};
