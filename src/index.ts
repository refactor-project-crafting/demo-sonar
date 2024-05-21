import "dotenv/config";
import startServer from "./server/index.js";

const port = process.env.PORT ?? 4005;

startServer(Number(port));
