export interface EndosphereZone {
  name: string;
  time: string;
  prices: number[];
}

export const endosphere: EndosphereZone[] = [
  {
    name: "endosphere.zones.fullBody",
    time: "1 год",
    prices: [1500, 8100, 15300],
  },
  {
    name: "endosphere.zones.legsHipsSidesAbdomen",
    time: "50 хв",
    prices: [1300, 7020, 11700],
  },
  {
    name: "endosphere.zones.legsHips",
    time: "45 хв",
    prices: [1100, 5940, 11220],
  },
  {
    name: "endosphere.zones.abdomenSides",
    time: "40 хв",
    prices: [800, 4320, 8160],
  },
  {
    name: "endosphere.zones.face",
    time: "30 хв",
    prices: [800, 4320, 8160],
  },
];

export const endosphereDiscounts = [
  { label: "1 сеанс", sessions: "" },
  { label: "6 сеансів", sessions: "endosphere.discounts.tenPercent" },
  { label: "12 сеансів", sessions: "endosphere.discounts.fifteenPercent" },
];
