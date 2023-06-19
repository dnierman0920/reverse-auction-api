// External Dependencies
import * as mongoDB from "mongodb";

// Global Variables
export const collections: { buyers?: mongoDB.Collection } = {}; // add future collections here!

export class DatabaseDependency {
  private _client: mongoDB.MongoClient;
  private _db: mongoDB.Db;

  constructor(connectionString: string, dbName: string) {
    this._client = new mongoDB.MongoClient(connectionString);
    this._db = this._client.db(dbName);
    // add future collections here!
    collections.buyers = this._db.collection("buyers");
  }

  public get db() {
    return this._db;
  }

  public async connectToDatabase(): Promise<mongoDB.MongoClient> {
    const connection = await this._client.connect();
    console.log(`Successfully connected to database: ${this._db.databaseName}`);
    return connection;
  }
}
