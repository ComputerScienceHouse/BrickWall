import { Interview } from '../../../api/types/interview';

export interface UpdateInterviewModalProps {
  isOpen: boolean;
  toggle: () => void;
  item: Interview;
}
