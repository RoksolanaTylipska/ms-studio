import { Zones } from "@/types/zones";

export const eyebrow: Zones[] = [
  {
    title: "face.eyebrow",
    variants: [
      { label: "face.eyebrow_correction", price: [250] },
      { label: "face.tinting", price: [250] },
      { label: "face.correction_tinting", price: [350] },
    ],
  },
  {
    title: "face.lamination",
    variants: [
      { label: "face.lamination_tinting", price: [750] },
      { label: "face.lasting_styling", price: [450, 550] },
    ],
  },
  {
    title: "face.makeup",
    variants: [
      { label: "face.day", price: [600] },
      { label: "face.evening", price: [1000] },
      { label: "face.express", price: [500] },
    ],
  },
  {
    title: "face.complexes",
    variants: [
      { label: "face.lamination_eyebrows", price: [1100] },
      { label: "face.eyebrow_eyelash_lamination", price: [1250] },
      { label: "face.eyebrow_eyelash_lamination_without", price: [1150] },
    ],
  },
  {
    title: "face.permanent",
    variants: [
      { label: "face.initial_procedure", price: [2500] },
      { label: "face.correction", price: [1500] },
    ],
  },
];
