import { type NextFunction, type Request, type Response } from "express";
import type GentlemenRepository from "../../repository/GentlemenRepository/types";
import ServerError from "../../../server/ServerError/ServerError.js";
import { type GentlemanData } from "../../types";

class GentlemenController {
  constructor(private readonly gentlemenRepository: GentlemenRepository) {}

  getGentlemen = async (_req: Request, res: Response) => {
    const gentlemen = await this.gentlemenRepository.getAll();

    res.status(200).json({ gentlemen });
  };

  getGentlemanById = async (
    req: Request<{ gentlemanId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const { gentlemanId } = req.params;

    try {
      const gentleman = await this.gentlemenRepository.getById(gentlemanId);

      res.status(200).json({ gentleman });
    } catch (error) {
      const serverError = new ServerError((error as Error).message, 404);

      next(serverError);
    }
  };

  createGentleman = async (
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      GentlemanData
    >,
    res: Response,
    next: NextFunction
  ) => {
    const gentlemanData = req.body;

    const newGentleman = await this.gentlemenRepository.create(gentlemanData);

    res.status(201).json({ newGentleman });
  };
}

export default GentlemenController;
