import { Company } from './company';

export enum JobType {
  CO_OP = 'co_op',
  FULL_TIME = 'full_time'
}

export interface Position {
  id: number;
  company: Company;
  title: string;
  job_type: JobType;
}
