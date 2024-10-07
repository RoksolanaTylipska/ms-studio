import { Zones } from "./zones";

export interface Complex {
  type: string;
  time: string;
  name: string;
  prices: number[];
}

export interface LazerEpilation {
  title: string;
  gender: string;
  complex: string;
  zone: string;
  complexes: Complex[];
  zones: Zones[];
}
