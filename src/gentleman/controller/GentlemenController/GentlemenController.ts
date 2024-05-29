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
      const errorMessage = (error as Error).message;
      const serverErrorMessage =
        errorMessage === "Gentleman not found"
          ? "Gentleman not found"
          : (error as Error).message;
      const statusCode =
        serverErrorMessage === "Gentleman not found" ? 404 : 400;

      const serverError = new ServerError(serverErrorMessage, statusCode);

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

    try {
      const newGentleman = await this.gentlemenRepository.create(gentlemanData);

      res.status(201).json({ newGentleman });
    } catch (error) {
      const statusCode =
        (error as Error).message === "Invalid gentleman format" ? 400 : 409;
      const serverError = new ServerError((error as Error).message, statusCode);

      next(serverError);
    }
  };

  deleteGentleman = async (
    req: Request<{ gentlemanId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const { gentlemanId } = req.params;

    try {
      const deletedGentleman = await this.gentlemenRepository.delete(
        gentlemanId
      );

      res.status(200).json({ deletedGentleman });
    } catch (error) {
      const serverError = new ServerError((error as Error).message, 404);

      next(serverError);
    }
  };
}

export default GentlemenController;
