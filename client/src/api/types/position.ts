import { Company, CreateCompany } from './company';
import { Connect, Create } from '..';

export enum JobType {
  CO_OP = 'co_op',
  FULL_TIME = 'full_time'
}

export interface JobPosition {
  id: number;
  company: Company;
  title: string;
  job_type: JobType;
}

export interface CreatePosition {
  company: Connect | Create<CreateCompany>;
  title: string;
  job_type: JobType;
}
