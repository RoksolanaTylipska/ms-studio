export interface EndosphereZone {
  name: string;
  time: string;
  prices: number[];
}

export const endosphere: EndosphereZone[] = [
  {
    name: "endosphere.zones.fullBody",
    time: "endosphere.time.oneHour",
    prices: [1500, 8100, 15300],
  },
  {
    name: "endosphere.zones.legsHipsSidesAbdomen",
    time: "endosphere.time.min50",
    prices: [1300, 7020, 11700],
  },
  {
    name: "endosphere.zones.legsHips",
    time: "endosphere.time.min45",
    prices: [1100, 5940, 11220],
  },
  {
    name: "endosphere.zones.abdomenSides",
    time: "endosphere.time.min40",
    prices: [800, 4320, 8160],
  },
  {
    name: "endosphere.zones.face",
    time: "endosphere.time.min30",
    prices: [800, 4320, 8160],
  },
];

export const endosphereDiscounts = [
  { label: "endosphere.sessions.one", sessions: "" },
  { label: "endosphere.sessions.six", sessions: "endosphere.discounts.tenPercent" },
  { label: "endosphere.sessions.twelve", sessions: "endosphere.discounts.fifteenPercent" },
];
