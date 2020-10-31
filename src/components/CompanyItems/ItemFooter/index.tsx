import { useReactOidc } from '@axa-fr/react-oidc-context';
import React from 'react';
import { Button, CardFooter } from 'reactstrap';
import { Interview } from '../../../api/types/interview';
import { JobReview } from '../../../api/types/jobReview';
import { Offer } from '../../../api/types/offer';

interface ItemFooterProps {
  item: JobReview | Interview | Offer;
}

export const ItemFooter: React.FunctionComponent<ItemFooterProps> = ({
  item
}) => {
  const { oidcUser } = useReactOidc();

  const {
    profile: { preferred_username }
  } = oidcUser ?? { profile: {} };
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
            <Button color="link" size={'sm'}>
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
      </div>
    </CardFooter>
  );
};
