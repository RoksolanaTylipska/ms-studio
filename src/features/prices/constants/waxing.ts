import { Zone } from "@/features/prices/types/zones";

export const waxing: Zone[] = [
  {
    title: "zones.bikini",
    variants: [
      { label: "zones.bikiniList.deep", price: [700, 1100] },
      { label: "zones.bikiniList.average", price: [650, 1000] },
      { label: "zones.bikiniList.panties", price: [500, 900] },
    ],
  },
  {
    title: "zones.arms",
    variants: [
      { label: "zones.armsList.groinArea", price: [350, 500] },
      { label: "zones.armsList.halfArms", price: [550, 700] },
      { label: "zones.armsList.fullArms", price: [600, 900] },
    ],
  },
  {
    title: "zones.legs",
    variants: [
      { label: "zones.legsList.shinsThighs", price: [500, 700] },
      { label: "zones.legsList.fullLegs", price: [750, 1200] },
    ],
  },
  {
    title: "zones.face",
    variants: [
      { label: "zones.faceList.upperLip", price: [300, 300] },
      { label: "zones.faceList.noseEars", price: [300, 300] },
      { label: "zones.faceList.chin", price: [300, 500] },
      { label: "zones.faceList.cheeks", price: [300, 350] },
      { label: "zones.faceList.eyebrows", price: [400, 400] },
    ],
  },
  {
    title: "zones.body",
    variants: [
      { label: "zones.bodyList.areolaFullChest", price: [250, 500] },
      { label: "zones.bodyList.stomachLine", price: [250, 300] },
      { label: "zones.bodyList.fullStomach", price: [500, 800] },
      { label: "zones.bodyList.lowerBack", price: [350, 500] },
      { label: "zones.bodyList.back", price: [500, 800] },
      { label: "zones.bodyList.buttocks", price: [400, 600] },
    ],
  },
];
