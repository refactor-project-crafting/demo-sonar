import { type GentlemanStructure } from "../types";
import { Types } from "mongoose";

export const arthurMock: GentlemanStructure = {
  _id: new Types.ObjectId().toString(),
  name: "Arthur Pérez-Reverte",
  profession: "Literator",
  status: "Alive",
  picture: "arthur.webp",
  alternativeText: "Arthur with round glasses",
  twitter: "@arthur",
  selected: false,
};

export const littleOneMock: GentlemanStructure = {
  _id: new Types.ObjectId().toString(),
  name: "Little One of the Road",
  profession: "Fistro pequeitorl",
  status: "RIP",
  picture: "little-one.webp",
  alternativeText: "Little One With-one-leg-up-and-one-arm-in-his-wrist",
  twitter: "@little1",
  selected: true,
};

export const gentlemenMock: GentlemanStructure[] = [arthurMock, littleOneMock];
