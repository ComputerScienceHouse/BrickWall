import { JobReview } from '../../../api/types/jobReview';

export interface UpdateJobReviewModalProps {
  isOpen: boolean;
  toggle: () => void;
  item: JobReview;
}
