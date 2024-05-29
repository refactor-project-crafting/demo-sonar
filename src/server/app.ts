import express from "express";
import cors from "cors";
import morgan from "morgan";
import pingRouter from "../ping/router/pingRouter.js";
import {
  generalError,
  notFoundError,
} from "./middlewares/error/errorMiddlewares.js";
import gentlemenRouter from "../gentleman/router/gentlemenRouter.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/", pingRouter);
app.use("/gentlemen", gentlemenRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
