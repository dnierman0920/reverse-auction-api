// External Dependencies
import * as mongoDB from "mongodb";

export class DatabaseDependency {
  private _collections: any;
  private _client: mongoDB.MongoClient;
  private _db: mongoDB.Db;

  constructor(connectionString: string, dbName: string) {
    this._client = new mongoDB.MongoClient(connectionString);
    this._db = this._client.db(dbName);
    this._collections = { buyers: this._db.collection("buyers") }; // add future collections here!
  }

  public async connectToDatabase() {
    await this._client.connect();
    console.log(`Successfully connected to database: ${this._db.databaseName}`);
  }

  public get collections() {
    return this._collections;
  }
}
