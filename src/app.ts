import { DatabaseDependency } from "./services/databaseDependency";
import { ServerDependency } from "./services/serverDependency";

require("dotenv").config();
const port: number = parseInt(<string>process.env.PORT, 10) || 3000;
const connectionString: string =
  process.env.DB_CONN_STRING ?? "Define Connection String in .ENV!";
const dbName: string =
  process.env.DB_NAME ?? "Define Connection String in .ENV!";

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
