import { DatabaseDependency } from "./services/databaseDependency";
import { ServerDependency } from "./services/serverDependency";

import dotenv from "dotenv";
dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? "production.env"
      : "development.env",
});

const port: number = parseInt(<string>process.env.PORT, 10) || 3000;
const connectionString: string =
  process.env.DB_CONNECTION_STRING ?? "Define Connection String in .ENV!";
const dbName: string = "reverseAuctionDB";

export let s: ServerDependency;

const db = new DatabaseDependency(connectionString, dbName);

export const connection = db
  .connectToDatabase()
  .then(() => {
    s = new ServerDependency(port);
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
