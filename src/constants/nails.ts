import { Zones } from "@/types/zones";

export const nails: Zones[] = [
  {
    title: "nails.womens_manicure",
    variants: [
      { label: "nails.removal_cleaning_coating", price: [550] },
      { label: "nails.cleaning_coating", price: [600] },
      { label: "nails.removal_cleaning", price: [450] },
      { label: "nails.cleaning", price: [350] },
      { label: "nails.strengthening", price: [150] },
      { label: "nails.shape", price: [100] },
      { label: "nails.french", price: [120] },
      { label: "nails.repair", price: [50] },
      { label: "nails.extension", price: [80] },
      { label: "nails.design", price: [40] },
    ],
  },
  {
    title: "nails.mens_manicure",
    variants: [
      { label: "nails.cleaning", price: [1000] },
      { label: "nails.cleaning_coating", price: [1100] },
    ],
  },
  {
    title: "nails.womens_pedicure",
    variants: [
      { label: "nails.cleaning_heels_coating", price: [850] },
      { label: "nails.cleaning_heels", price: [750] },
      { label: "nails.cleaning_coating", price: [750] },
      { label: "nails.cleaning", price: [700] },
    ],
  },
  {
    title: "nails.mens_pedicure",
    variants: [
      { label: "nails.cleaning_heels", price: [1000] },
      { label: "nails.cleaning_heels_coating", price: [1100] },
    ],
  },
  {
    title: "nails.mens_pedicure",
    variants: [
      { label: "nails.unilateral_tamponade", price: [100] },
      { label: "nails.bilateral_tamponade", price: [200] },
      { label: "nails.corn_removal", price: [250, 300] },
      { label: "nails.callus_removal", price: [200, 250] },
      { label: "nails.crack_treatment", price: [250, 300] },
      { label: "nails.ingrown_toenail_removal", price: [150] },

    ],
  },
]