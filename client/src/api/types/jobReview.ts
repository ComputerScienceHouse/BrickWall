import { Company, CreateCompany } from './company';
import { Connect, Create } from '..';
import { CreatePosition, JobPosition } from './position';

export interface JobReview {
  id: number;
  member: string;
  position: JobPosition;
  company: Company;
  start_date: Date;
  end_date?: Date;
  body?: string;
}

export interface CreateJobReview {
  member: string;
  position: Connect | Create<CreatePosition>;
  company: Connect | Create<CreateCompany>;
  start_date: Date;
  end_date?: Date;
  body?: string;
}
