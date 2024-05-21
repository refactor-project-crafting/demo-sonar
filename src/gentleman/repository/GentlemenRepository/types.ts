import { type GentlemanData, type Gentleman } from "../../types";

interface GentlemenRepository {
  getAll: () => Promise<Gentleman[]>;
  getById: (gentlemanId: string) => Promise<Gentleman>;
  create: (gentlemanData: GentlemanData) => Promise<Gentleman>;
}

export default GentlemenRepository;
