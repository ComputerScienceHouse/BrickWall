import { Company, CreateCompany } from './company';
import { Connect, Create } from '..';
import { CreatePosition, JobPosition } from './position';

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

export interface CreateInterview {
  member: string;
  position: Connect | Create<CreatePosition>;
  company: Connect | Create<CreateCompany>;
  codingchallenge?: boolean;
  onsite?: boolean;
  body?: string;
}
