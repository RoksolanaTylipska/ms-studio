import { Electroepilation } from "@/features/prices/types/electroepilation";

export const electroepilation: Electroepilation[] = [
  {
    masterQnt: "electroepilation.oneMaster",
    values: [
      "electroepilation.time",
      "electroepilation.expertMaster",
      "electroepilation.master",
    ],
    variants: [
      { label: "electroepilation.zones.body", time: 1, price: [19, 16] },
      { label: "electroepilation.zones.face", time: 1, price: [20, 16] },
      { label: "electroepilation.zones.bikini", time: 1, price: [21, 18] },
      {
        label: "electroepilation.zones.upTo30minutes",
        time: 30,
        price: [700, 600],
      },
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
      { label: "electroepilation.zones.body", time: 1, price: [38, 32] },
      { label: "electroepilation.zones.face", time: 1, price: [40, 32] },
      { label: "electroepilation.zones.bikini", time: 1, price: [42, 36] },
    ],
  },
];
