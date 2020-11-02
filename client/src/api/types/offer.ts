import { City, CreateCity } from './city';
import { Company, CreateCompany } from './company';
import { Connect, Create } from '..';
import { CreatePosition, JobPosition } from './position';

export enum PayType {
  HOURLY = 'hourly',
  SALARY = 'salary'
}

export enum Housing {
  CORPORATE = 'corporate',
  STIPEND = 'stipend'
}

export interface Offer {
  id: number;
  member: string;
  pay: number;
  paytype: PayType;
  position: JobPosition;
  offerdate: string | null;
  offerdeadline: string | null;
  housing: Housing;
  stipend: number | null;
  stocks: number | null;
  relocation: number | null;
  signing_bonus: number | null;
  location: City | null;
  remote: boolean;
  company: Company;
  body: string | null;
}

export interface CreateOffer {
  member: string;
  pay: number;
  paytype: PayType;
  position: Connect | Create<CreatePosition>;
  offerdate?: Date;
  offerdeadline?: Date;
  housing?: Housing;
  stipend?: number;
  stocks?: number;
  relocation?: number;
  signing_bonus?: number;
  location?: Connect | Create<CreateCity>;
  remote?: boolean;
  company: Connect | Create<CreateCompany>;
  body?: string;
}

export interface UpdateOffer {
  member?: string;
  pay?: number;
  paytype?: PayType;
  position?: Connect | Create<CreatePosition>;
  offerdate?: Date;
  offerdeadline?: Date;
  housing?: Housing;
  stipend?: number;
  stocks?: number;
  relocation?: number;
  signing_bonus?: number;
  location?: Connect | Create<CreateCity>;
  remote?: boolean;
  company?: Connect | Create<CreateCompany>;
  body?: string;
}
