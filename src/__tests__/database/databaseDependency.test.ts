import { DatabaseDependency } from "../../services/databaseDependency";

describe("databaseDependency-test", function () {
  it("should successfully connect to a database", async function () {
    const dbd = new DatabaseDependency(
      "mongodb://localhost:27017",
      "reverseAuctionDBTest"
    );
    const connection = await dbd.connectToDatabase();
    await connection.close();
  });
});
