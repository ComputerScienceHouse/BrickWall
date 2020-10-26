import { Company } from './company';
import { JobPosition } from './position';

export interface Interview {
  id: number;
  member: string;
  position: JobPosition;
  company: Company;
  interviewcount: number;
  codingchallenge?: boolean;
  onsite?: boolean;
  body?: string;
}
