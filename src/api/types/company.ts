import { City } from './city';
import { Interview } from './interview';
import { JobReview } from './jobReview';
import { Offer } from './offer';

export interface Company {
  id: number;
  name: string;
  website: string | null;
  headquarter?: City;
  Interviews?: Interview[];
  Offers?: Offer[];
  JobReviews?: JobReview[];
}
