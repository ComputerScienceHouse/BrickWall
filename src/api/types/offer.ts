import { Position } from './position';

export enum PayType {
  HOURLY = 'hourly',
  SALARY = 'salary'
}

export interface Offer {
  member: string;
  pay: number;
  paytype: PayType;
  position: Position;
}
