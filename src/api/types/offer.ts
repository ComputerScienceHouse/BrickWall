import { City } from './city';
import { Company } from './company';
import { Position } from './position';

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
  position: Position;
  offerdate: string | null;
  offerdeadline: string | null;
  housing: Housing;
  stipend: number | null;
  stocks: number | null;
  relocation: number | null;
  signing_bonus: number | null;
  location: City | null;
  remote: boolean;
  company?: Company;
  body: string | null;
}
