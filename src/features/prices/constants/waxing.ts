import { Zone } from "@/features/prices/types/zones";

export const waxing: Zone[] = [
  {
    title: "zones.bikini",
    variants: [
      { label: "zones.bikiniList.deep", price: [550, 800] },
      { label: "zones.bikiniList.average", price: [450, 600] },
      { label: "zones.bikiniList.panties", price: [350, 500] },
    ],
  },
  {
    title: "zones.arms",
    variants: [
      { label: "zones.armsList.groinArea", price: [250, 350] },
      { label: "zones.armsList.halfArms", price: [400, 500] },
      { label: "zones.armsList.fullArms", price: [450, 600] },
    ],
  },
  {
    title: "zones.legs",
    variants: [
      { label: "zones.legsList.shinsThighs", price: [350, 500] },
      { label: "zones.legsList.fullLegs", price: [600, 700] },
    ],
  },
  {
    title: "zones.face",
    variants: [
      { label: "zones.faceList.upperLip", price: [200, 250] },
      { label: "zones.faceList.noseEars", price: [200, 250] },
      { label: "zones.faceList.chin", price: [200, 400] },
      { label: "zones.faceList.cheeks", price: [200, 350] },
      { label: "zones.faceList.eyebrows", price: [250, 300] },
    ],
  },
  {
    title: "zones.body",
    variants: [
      { label: "zones.bodyList.areolaFullChest", price: [200, 500] },
      { label: "zones.bodyList.stomachLine", price: [200, 250] },
      { label: "zones.bodyList.fullStomach", price: [300, 500] },
      { label: "zones.bodyList.lowerBack", price: [250, 400] },
      { label: "zones.bodyList.back", price: [400, 600] },
      { label: "zones.bodyList.buttocks", price: [300, 500] },
    ],
  },
];
