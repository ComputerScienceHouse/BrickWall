import { City, CreateCity } from './city';
import { Connect, Create } from '..';

import { Interview } from './interview';
import { JobPosition } from './position';
import { JobReview } from './jobReview';
import { Offer } from './offer';

export interface Company {
  id: number;
  name: string;
  website: string | null;
  headquarters?: City;
  logo: string;
  Interviews?: Interview[];
  Offers?: Offer[];
  JobReviews?: JobReview[];
  Positions?: JobPosition[];
}

export interface CreateCompany {
  name: string;
  website: string | null;
  headquarters: Connect | Create<CreateCity>;
}
