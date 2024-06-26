import { type NextFunction, type Request, type Response } from "express";
import ServerError from "../../ServerError/ServerError.js";

export const notFoundError = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  const error = new ServerError("Endpoint not found", 404);

  next(error);
};

export const generalError = (
  error: ServerError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500;
  const errorMessage = error.message || "General pete";

  res.status(statusCode).json({ error: errorMessage });
};
