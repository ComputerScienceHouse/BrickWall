import { City } from './city';
import { Interview } from './interview';
import { JobReview } from './jobReview';
import { Offer } from './offer';
import { Position } from './position';

export interface Company {
  id: number;
  name: string;
  website: string | null;
  headquarters?: City;
  Interviews?: Interview[];
  Offers?: Offer[];
  JobReviews?: JobReview[];
  Positions?: Position[];
}
