import { type Model } from "mongoose";
import { type GentlemanStructure, type GentlemanData } from "../../types";
import type GentlemenRepository from "./types";

class GentlemenMongooseRepository implements GentlemenRepository {
  constructor(private readonly gentlemenModel: Model<GentlemanStructure>) {}

  async getAll(): Promise<GentlemanStructure[]> {
    const gentlemen = await this.gentlemenModel.find().exec();

    return gentlemen;
  }

  async getById(gentlemanId: string): Promise<GentlemanStructure> {
    try {
      const gentleman = await this.gentlemenModel.findById(gentlemanId).exec();

      if (!gentleman) {
        throw new Error("Gentleman not found");
      }

      return gentleman;
    } catch (error) {
      const errorMessage = (error as Error).message;

      throw new Error(
        errorMessage === "Gentleman not found"
          ? errorMessage
          : "Id format not valid"
      );
    }
  }

  async create(gentlemanData: GentlemanData): Promise<GentlemanStructure> {
    try {
      const newGentleman = await this.gentlemenModel.create(gentlemanData);

      return newGentleman;
    } catch (error) {
      const errorCode = (error as { code: number }).code;
      console.log(error);
      throw new Error(
        errorCode === 11000
          ? "Gentleman already exists"
          : "Invalid gentleman format"
      );
    }
  }

  async delete(gentlemanId: string): Promise<GentlemanStructure> {
    const deletedGentleman = await this.gentlemenModel
      .findByIdAndDelete(gentlemanId)
      .exec();

    if (!deletedGentleman) {
      throw new Error("No gentleman found");
    }

    return deletedGentleman;
  }
}

export default GentlemenMongooseRepository;
