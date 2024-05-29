import { Schema, model } from "mongoose";
import { type GentlemanStructure } from "../types";

const gentlemanSchema = new Schema<GentlemanStructure>({
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  alternativeText: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["Alive", "RIP", "Reborn"],
    required: true,
  },
  twitter: {
    type: String,
    required: true,
    unique: true,
  },
});

const Gentleman = model("Gentleman", gentlemanSchema, "gentlemen");

export default Gentleman;
