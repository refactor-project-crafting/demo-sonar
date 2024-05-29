import { type GentlemanData, type GentlemanStructure } from "../../types";

interface GentlemenRepository {
  getAll: () => Promise<GentlemanStructure[]>;
  getById: (gentlemanId: string) => Promise<GentlemanStructure>;
  create: (gentlemanData: GentlemanData) => Promise<GentlemanStructure>;
  delete: (gentlemanId: string) => Promise<GentlemanStructure>;
}

export default GentlemenRepository;
