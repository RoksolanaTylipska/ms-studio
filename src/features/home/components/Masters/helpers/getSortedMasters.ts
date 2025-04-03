import { Master } from "@/features/home/components/Masters/types/masters";

export const getSortedMasters = (masters: Master[] = []) => {
  if (!masters) return [];
  return [...masters].sort((a, b) => {
    const priorityA = a.priority ?? Infinity;
    const priorityB = b.priority ?? Infinity;
    return priorityA - priorityB;
  });
};
