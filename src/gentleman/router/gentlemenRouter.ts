import { Router } from "express";
import GentlemenController from "../controller/GentlemenController/GentlemenController.js";
import GentlemenInMemoryRepository from "../repository/GentlemenRepository/GentlemenInMemoryRepository.js";
import gentlemen from "../data.js";

const gentlemenRouter = Router();

const gentlemenRepository = new GentlemenInMemoryRepository(gentlemen);
const gentlemenController = new GentlemenController(gentlemenRepository);

gentlemenRouter.get("/", gentlemenController.getGentlemen);
gentlemenRouter.get("/:gentlemanId", gentlemenController.getGentlemanById);
gentlemenRouter.post("/", gentlemenController.createGentleman);

export default gentlemenRouter;
