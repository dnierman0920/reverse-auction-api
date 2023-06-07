// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { procurers?: mongoDB.Collection } = {};

// Initialize Connection

export async function connectToDatabase() {
  dotenv.config();

  const connectionString: string =
    process.env.DB_CONN_STRING ?? "Define Connection String in .ENV!";
  const collectionName: string =
    process.env.COLLECTION_NAME ?? "Define Collection in .ENV!";

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(connectionString);

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const procurers: mongoDB.Collection = db.collection(collectionName);

  collections.procurers = procurers;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${procurers.collectionName}`
  );
}
