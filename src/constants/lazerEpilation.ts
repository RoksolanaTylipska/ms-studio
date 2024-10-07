import { LazerEpilation } from "@/types/lazerEpilation";

export const discountsComplexes = [
  { label: "-25%", sessions: "services.sessions10" },
  { label: "-15%", sessions: "services.sessions5" },
  { label: "-10%", sessions: "services.sessions1" },
];

export const discountsZones = [
  { label: "-20%", sessions: "services.sessions10" },
  { sessions: "services.sessions1" },
];

export const lazerEpilation: LazerEpilation[] = [
  {
    title: "services.lazer",
    gender: "services.gender.women",
    complex: "services.complex",
    zone: "services.zone",
    complexes: [
      {
        type: "MINI",
        time: "30 хв",
        name: "lazerEpilation.complexes.mini",
        prices: [920, 1040, 1150],
      },
      {
        type: "MIDI",
        time: "45 хв",
        name: "lazerEpilation.complexes.midi",
        prices: [1440, 1620, 1800],
      },
      {
        type: "MAXI",
        time: "60 хв",
        name: "lazerEpilation.complexes.maxi",
        prices: [1920, 2160, 2400],
      },
    ],
    zones: [
      {
        title: "zones.bikini",
        variants: [
          { label: "zones.bikiniList.deep", price: [720, 900] },
          { label: "zones.bikiniList.average", price: [480, 600] },
          { label: "zones.bikiniList.panties", price: [480, 600] },
        ],
      },
      {
        title: "zones.arms",
        variants: [
          { label: "zones.armsList.groinArea", price: [260, 325] },
          { label: "zones.armsList.halfArms", price: [440, 550] },
          { label: "zones.armsList.fullArms", price: [720, 900] },
        ],
      },
      {
        title: "zones.legs",
        variants: [
          { label: "zones.legsList.shinsThighs", price: [720, 900] },
          { label: "zones.legsList.fullLegs", price: [1200, 1500] },
        ],
      },
      {
        title: "zones.face",
        variants: [
          { label: "zones.faceList.upperLip", price: [240, 300] },
          { label: "zones.faceList.foreheadLine", price: [240, 300] },
          { label: "zones.faceList.chin", price: [240, 300] },
          { label: "zones.faceList.cheeks", price: [240, 300] },
          { label: "zones.faceList.eyebrows", price: [240, 300] },
        ],
      },
      {
        title: "zones.body",
        variants: [
          { label: "zones.bodyList.areola", price: [240, 300] },
          { label: "zones.bodyList.stomachLine", price: [240, 300] },
          { label: "zones.bodyList.fullStomach", price: [480, 600] },
          { label: "zones.bodyList.lowerBack", price: [480, 600] },
          { label: "zones.bodyList.back", price: [720, 900] },
          { label: "zones.bodyList.buttocks", price: [480, 600] },
        ],
      },
    ],
  },
  {
    title: "services.lazer",
    gender: "services.gender.men",
    complex: "services.complex",
    zone: "services.zone",
    complexes: [
      {
        type: "MINI",
        time: "30 хв",
        name: "lazerEpilation.complexes.mini",
        prices: [1240, 1395, 1550],
      },
      {
        type: "MIDI",
        time: "45 хв",
        name: "lazerEpilation.complexes.midi",
        prices: [2000, 2250, 2500],
      },
      {
        type: "MAXI",
        time: "60 хв",
        name: "lazerEpilation.complexes.maxi",
        prices: [2400, 2700, 3000],
      },
    ],
    zones: [
      {
        title: "zones.bikini",
        variants: [
          { label: "zones.bikiniList.deep", price: [1000, 1250] },
          {
            label: "zones.bikiniList.pubicTriangle",
            price: [800, 1000],
          },
        ],
      },
      {
        title: "zones.arms",
        variants: [
          { label: "zones.armsList.groinArea", price: [320, 400] },
          { label: "zones.armsList.halfArms", price: [520, 650] },
          { label: "zones.armsList.fullArms", price: [800, 1000] },
        ],
      },
      {
        title: "zones.legs",
        variants: [
          { label: "zones.legsList.shinsThighs", price: [800, 1000] },
          { label: "zones.legsList.fullLegs", price: [1200, 1500] },
        ],
      },
      {
        title: "zones.face",
        variants: [
          { label: "zones.faceList.upperLip", price: [320, 400] },
          { label: "zones.faceList.foreheadLine", price: [320, 400] },
          { label: "zones.faceList.chin", price: [440, 550] },
          { label: "zones.faceList.cheeksLine", price: [320, 400] },
          { label: "zones.faceList.cheeksFully", price: [440, 550] },
          { label: "zones.faceList.eyebrows", price: [320, 400] },
        ],
      },
      {
        title: "zones.body",
        variants: [
          { label: "zones.bodyList.сhest", price: [520, 650] },
          { label: "zones.bodyList.stomachLine", price: [240, 300] },
          { label: "zones.bodyList.fullStomach", price: [520, 650] },
          { label: "zones.bodyList.lowerBack", price: [520, 650] },
          { label: "zones.bodyList.back", price: [800, 1000] },
          { label: "zones.bodyList.buttocks", price: [600, 800] },
        ],
      },
    ],
  },
];
