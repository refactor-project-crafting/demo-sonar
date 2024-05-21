import { type Request, type Response } from "express";

class PingController {
  getPing(_req: Request, res: Response) {
    res.status(200).json({ message: "OK" });
  }
}

export default PingController;
