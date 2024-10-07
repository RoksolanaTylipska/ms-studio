import { Master } from "@/types/electroepilation";

export const electroepilation: Master[] = [
  {
    masterQnt: "electroepilation.oneMaster",
    values: [
      "electroepilation.time",
      "electroepilation.expertMaster",
      "electroepilation.master",
    ],
    variants: [
      { label: "electroepilation.zones.body", time: 1, price: [15, 15] },
      { label: "electroepilation.zones.face", time: 1, price: [18, 15] },
      { label: "electroepilation.zones.bikini", time: 1, price: [19, 16] },
      { label: "electroepilation.zones.upTo30minutes", time: 30, price: [600, 600]},
    ],
  },
  {
    masterQnt: "electroepilation.twoMasters",
    values: [
      "electroepilation.time",
      "electroepilation.expertMaster",
      "electroepilation.master",
    ],

    variants: [
      { label: "electroepilation.zones.body", time: 1, price: [30, 30] },
      { label: "electroepilation.zones.face", time: 1, price: [33, 30] },
      { label: "electroepilation.zones.bikini", time: 1, price: [35, 32] },
    ],
  },
];
