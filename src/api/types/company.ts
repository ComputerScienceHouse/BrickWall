import { Connect, Create } from '..';
import { City, CreateCity } from './city';
import { Interview } from './interview';
import { JobReview } from './jobReview';
import { Offer } from './offer';
import { Position } from './position';

export interface Company {
  id: number;
  name: string;
  website: string | null;
  headquarters?: City;
  logo: string;
  Interviews?: Interview[];
  Offers?: Offer[];
  JobReviews?: JobReview[];
  Positions?: Position[];
}

export interface CreateCompany {
  name: string;
  website: string | null;
  headquarters: Connect | Create<CreateCity>;
}
