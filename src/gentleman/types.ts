export interface Gentleman {
  _id: string;
  name: string;
  profession: string;
  status: string;
  twitter: string;
  picture: string;
  alternativeText: string;
  selected: boolean;
}

export type GentlemanData = Omit<Gentleman, "_id">;
