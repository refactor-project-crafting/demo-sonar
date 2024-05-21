import { randomUUID } from "node:crypto";
import { type GentlemanData, type Gentleman } from "../../types";
import type GentlemenRepository from "./types";

class GentlemenInMemoryRepository implements GentlemenRepository {
  constructor(private readonly gentlemen: Gentleman[]) {}

  async getAll(): Promise<Gentleman[]> {
    return this.gentlemen;
  }

  async getById(gentlemanId: string): Promise<Gentleman> {
    const foundGentleman = this.gentlemen.find(
      (gentleman) => gentleman._id === gentlemanId
    );

    if (!foundGentleman) {
      throw new Error("Gentleman not found");
    }

    return foundGentleman;
  }

  async create(gentlemanData: GentlemanData): Promise<Gentleman> {
    const existingGentleman = this.gentlemen.find(
      (gentleman) => gentleman.twitter === gentlemanData.twitter
    );

    if (existingGentleman) {
      throw new Error("The gentleman already exists");
    }

    const newGentleman: Gentleman = {
      _id: randomUUID(),
      ...gentlemanData,
    };

    this.gentlemen.push(newGentleman);

    return newGentleman;
  }
}

export default GentlemenInMemoryRepository;
