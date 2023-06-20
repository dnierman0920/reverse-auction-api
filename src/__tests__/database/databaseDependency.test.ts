import { MongoClient } from "mongodb";
import * as mongoDB from "mongodb";
import { DatabaseDependency } from "../../services/databaseDependency";

describe("databaseDependency-test", function () {
  const dbd = new DatabaseDependency(
    "mongodb://localhost:27017",
    "reverseAuctionDBTest"
  );
  it("should successfully connect to a database", async function () {
    const connection: MongoClient = await dbd.connectToDatabase();
    const isConnected = await dbd.isConnected();
    expect(isConnected).toBe(true);
  });

  it("should drop database", async function () {
    const dbDropped = await dbd.db.dropDatabase();
    expect(dbDropped).toBe(true);
  });

  it("should close db connection", async function () {
    await dbd.client.close();
    const isConnected = await dbd.isConnected();
    expect(isConnected).toBe(false);
  });
});
