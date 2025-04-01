interface Variant {
  label: string;
  time: number;
  price: number[];
}

export interface Electroepilation {
  masterQnt: string;
  values: string[];
  variants: Variant[];
}
