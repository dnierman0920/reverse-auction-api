import { DatabaseDependency } from "../../services/databaseDependency";
import { MongoClient } from "mongodb";

describe("buyerRoutes-test", function () {
  let connection: MongoClient;
  let dbd: DatabaseDependency;

  beforeAll(async () => {
    dbd = new DatabaseDependency(
      "mongodb://localhost:27017",
      "reverseAuctionDBTest"
    );
    connection = await dbd.connectToDatabase();
    await dbd.db.dropDatabase();
  });

  afterAll(async () => {
    await connection.close();
  });

  describe("cleanDB-test", function () {
    it("is the db clean?", async function () {
      const collections = (await dbd.db.collections()).length;
      expect(collections).toBe(0);
    });
  });
});
