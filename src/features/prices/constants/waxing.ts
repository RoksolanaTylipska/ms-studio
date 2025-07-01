import { Zone } from "@/features/prices/types/zones";

export const waxing: Zone[] = [
  {
    title: "zones.bikini",
    variants: [
      { label: "zones.bikiniList.deep", price: [600, 800] },
      { label: "zones.bikiniList.average", price: [550, 700] },
      { label: "zones.bikiniList.panties", price: [400, 600] },
    ],
  },
  {
    title: "zones.arms",
    variants: [
      { label: "zones.armsList.groinArea", price: [300, 400] },
      { label: "zones.armsList.halfArms", price: [450, 600] },
      { label: "zones.armsList.fullArms", price: [500, 800] },
    ],
  },
  {
    title: "zones.legs",
    variants: [
      { label: "zones.legsList.shinsThighs", price: [400, 600] },
      { label: "zones.legsList.fullLegs", price: [650, 800] },
    ],
  },
  {
    title: "zones.face",
    variants: [
      { label: "zones.faceList.upperLip", price: [250, 300] },
      { label: "zones.faceList.noseEars", price: [250, 300] },
      { label: "zones.faceList.chin", price: [250, 500] },
      { label: "zones.faceList.cheeks", price: [250, 350] },
      { label: "zones.faceList.eyebrows", price: [300, 400] },
    ],
  },
  {
    title: "zones.body",
    variants: [
      { label: "zones.bodyList.areolaFullChest", price: [250, 500] },
      { label: "zones.bodyList.stomachLine", price: [250, 300] },
      { label: "zones.bodyList.fullStomach", price: [350, 500] },
      { label: "zones.bodyList.lowerBack", price: [300, 400] },
      { label: "zones.bodyList.back", price: [450, 600] },
      { label: "zones.bodyList.buttocks", price: [400, 500] },
    ],
  },
];
