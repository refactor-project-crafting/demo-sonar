import { Router } from "express";
import PingController from "../PingController/PingController.js";

const pingRouter = Router();

const pingController = new PingController();

pingRouter.get("/", pingController.getPing);

export default pingRouter;
