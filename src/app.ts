import { DatabaseDependency } from "./services/database/databaseDependency";
import { ServerDependency } from "./server";

require("dotenv").config();
const port: number = parseInt(<string>process.env.PORT, 10) || 3000;
const connectionString: string =
  process.env.DB_CONN_STRING ?? "Define Connection String in .ENV!";
const dbName: string =
  process.env.DB_NAME ?? "Define Connection String in .ENV!";

export const s = new ServerDependency(port);

export const db = new DatabaseDependency(connectionString, dbName);

db.connectToDatabase()
  .then(() => {
    s.startServer();
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
