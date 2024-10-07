interface Variant {
  label: string;
  time: number;
  price: number[];
}

export interface Master {
  masterQnt: string;
  values: string[];
  variants: Variant[];
}
