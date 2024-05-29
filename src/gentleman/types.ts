export interface GentlemanStructure {
  _id: string;
  name: string;
  profession: string;
  status: "Alive" | "Reborn" | "RIP";
  twitter: string;
  picture: string;
  alternativeText: string;
  selected: boolean;
}

export type GentlemanData = Omit<GentlemanStructure, "_id">;
