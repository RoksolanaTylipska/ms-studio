import { Zone } from "@/types/zones";

export const eyebrow: Zone[] = [
  {
    title: "face.eyebrow",
    variants: [
      { label: "face.eyebrow_correction", price: [300] },
      { label: "face.tinting", price: [350] },
      { label: "face.correction_tinting", price: [500] },
    ],
  },
  {
    title: "face.lamination",
    variants: [
      { label: "face.lamination_tinting", price: [900] },
      { label: "face.lasting_styling", price: [500] },
      { label: "lasting_styling_correction", price: [550] },
      { label: "lasting_styling_correction_tinting", price: [650] },

    ],
  },
  // {
  //   title: "face.makeup",
  //   variants: [
  //     { label: "face.day", price: [600] },
  //     { label: "face.evening", price: [1000] },
  //     { label: "face.express", price: [500] },
  //   ],
  // },
  {
    title: "face.complexes",
    variants: [
      { label: "face.lamination_eyebrows", price: [1300] },
      { label: "face.lamination_eyebrows_correction", price: [1400] },
      { label: "face.lamination_eyebrows_correction_tinting", price: [1500] },
      { label: "face.lamination_eyebrows_without", price: [1350] },

    ],
  },
  {
    title: "face.man_eyebrows",
    variants: [
      { label: "face.man_correction", price: [400] },
      { label: "face.man_correction_thin", price: [500] },
    ],
  },
  {
    title: "face.permanent",
    variants: [
      { label: "face.initial_procedure", price: [3000] },
      { label: "face.correction", price: [1700] },
    ],
  },
];
