import "dotenv/config";
import chalk from "chalk";
import startServer from "./server/index.js";
import connectToDatabase from "./database/index.js";

const port = process.env.PORT ?? 4005;

if (!process.env.MONGODB_URL) {
  console.log(chalk.red("Missing Database configuration"));
  process.exit(1);
}

try {
  await connectToDatabase(process.env.MONGODB_URL);
  console.log(chalk.blue("Connected to database"));

  startServer(Number(port));
} catch (error) {
  console.log(
    chalk.red("Error connecting to database:", (error as Error).message)
  );
}
