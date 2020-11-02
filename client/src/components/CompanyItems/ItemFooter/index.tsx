import { Button, CardFooter } from 'reactstrap';
import React, { FunctionComponent } from 'react';

import { Company } from '@csh/ui/api/types/company';
import { Interview } from '@csh/ui/api/types/interview';
import { JobReview } from '@csh/ui/api/types/jobReview';
import { Offer } from '@csh/ui/api/types/offer';
import { UpdateInterviewModalProps } from '@csh/ui/components/InterviewModal/UpdateInterviewModal';
import { UpdateJobReviewModalProps } from '@csh/ui/components/JobReviewModal/UpdateJobReviewModal';
import { UpdateOfferModalProps } from '@csh/ui/components/OfferModal/UpdateOfferModal';
import { useReactOidc } from '@axa-fr/react-oidc-context';
import { useToggle } from 'react-use';

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
