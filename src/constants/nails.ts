import { Zone } from "@/types/zones";

export const nails: Zone[] = [
  {
    title: "nails.womens_manicure",
    variants: [
      { label: "nails.removal_cleaning_coating", price: [750] },
      { label: "nails.cleaning_coating", price: [700] },
      { label: "nails.removal_cleaning", price: [550] },
      { label: "nails.cleaning", price: [450] },
      { label: "nails.strengthening", price: [150] },
      { label: "nails.shape", price: [200] },
      { label: "nails.french", price: [200] },
      { label: "nails.repair", price: [60] },
      { label: "nails.extension", price: [100] },
      { label: "nails.design", price: [60] },
    ],
  },
  {
    title: "nails.mens_manicure",
    variants: [
      { label: "nails.cleaning", price: [1300] },
      { label: "nails.cleaning_coating", price: [1400] },
    ],
  },
  {
    title: "nails.womens_pedicure",
    variants: [
      { label: "nails.cleaning_heels_coating", price: [950] },
      { label: "nails.cleaning_heels", price: [850] },
      { label: "nails.cleaning_coating", price: [850] },
      { label: "nails.cleaning", price: [800] },
    ],
  },
  {
    title: "nails.mens_pedicure",
    variants: [
      { label: "nails.cleaning_heels", price: [1300] },
      { label: "nails.cleaning_heels_coating", price: [1400] },
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