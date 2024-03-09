import { atom } from "jotai";
import {
  FilterColorType,
  FilterFriendsType,
  FilterGroupType,
} from "../types/filter";

export const selectGroupAtom = atom<FilterGroupType>("all");
export const selectFriendsAtom = atom<FilterFriendsType>("all");
export const selectColorAtom = atom<FilterColorType>([]);

export const colorAtom = atom((get) =>
  get(selectColorAtom).map((option) => option.value)
);
