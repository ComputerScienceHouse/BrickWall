export interface City {
  id: number;
  city: string;
  state?: string;
  country: string;
}

export interface CreateCity {
  city: string;
  state?: string;
  country: string;
}
