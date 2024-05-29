import { Router } from "express";
import GentlemenMongooseRepository from "../repository/GentlemenRepository/GentlemenMongooseRepository.js";
import Gentleman from "../model/Gentleman.js";
import GentlemenController from "../controller/GentlemenController/GentlemenController.js";

const gentlemenRouter = Router();

const gentlemenMongooseRepository = new GentlemenMongooseRepository(Gentleman);
const gentlemenController = new GentlemenController(
  gentlemenMongooseRepository
);

gentlemenRouter.get("/", gentlemenController.getGentlemen);
gentlemenRouter.get("/:gentlemanId", gentlemenController.getGentlemanById);
gentlemenRouter.post("/", gentlemenController.createGentleman);
gentlemenRouter.delete("/:gentlemanId", gentlemenController.deleteGentleman);

export default gentlemenRouter;
