export interface Zone {
  title: string;
  variants: {
    label: string;
    price: [number, number];
  }[];
}

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
  zones: Zone[];
}
