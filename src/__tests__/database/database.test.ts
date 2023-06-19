import { ServerDependency } from "../../services/serverDependency";
import { DatabaseDependency } from "../../services/databaseDependency";

const { MongoClient } = require("mongodb");

describe("User Service Unit Tests", function () {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db("reverseAuctionDBTest");
  });

  afterAll(async () => {
    await connection.close();
  });
  describe("Save User functionality", function () {
    it("should successfully add a user if the number of users in the DB with the same profiled is zero", async function () {
      const buyers = db.collection("buyers");

      await buyers.insertOne({ name: "johnny" });
      const users = await buyers.find({}).toArray();
      const server = new ServerDependency(5050);
      // server.startServer();
      const dbd = new DatabaseDependency(
        "mongodb://localhost:27017",
        "reverseAuctionDBTest"
      );
      await dbd.connectToDatabase();
      const dbdBuyers = dbd.db.collection("buyers");
      const dbdUsers = await dbdBuyers.find({}).toArray();
      console.log("dbd users: ", dbdUsers);
      expect(dbdUsers).toBeNull;
      expect(users).not.toBe("");
    });
    it("should throw an error if the number of users with the same profileId is not zero", async function () {});
  });
});
