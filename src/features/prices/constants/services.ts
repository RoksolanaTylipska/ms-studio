import Electroepilation from "@/features/prices/components/Electroepilation";
import LaserEpilation from "@/features/prices/components/LaserEpilation";
import OtherServices from "@/features/prices/components/OtherServices";
import Waxing from "@/features/prices/components/Waxing";

export const services = [
  {
    title: "services.lazer",
    Component: LaserEpilation,
  },
  {
    title: "services.electroepilation",
    Component: Electroepilation,
  },
  {
    title: "services.waxing",
    Component: Waxing,
  },
  {
    title: "services.other",
    Component: OtherServices,
  },
];

export const modalServices = [
  {
    title: "services.lazer",
    images: {
      womens: "/assets/photos/prices/LE_w.png",
      mens: "/assets/photos/prices/LE_m.png",
    },
  },
  {
    title: "services.electroepilation",
    images: {
      womens: "/assets/photos/prices/Electro.png",
      mens: "/assets/photos/prices/Electro.png",
    },
  },
  {
    title: "services.waxing",
    images: {
      womens: "/assets/photos/prices/Waxing.png",
      mens: "/assets/photos/prices/Waxing.png",
    },
  },
];

export const otherServices = [
  {
    title: "services.otherServices.nails",
    image: "/assets/photos/prices/Nails.png",
  },
  {
    title: "services.otherServices.lashes_brows_makeup",
    image: "/assets/photos/prices/Other.png",
  },
];
