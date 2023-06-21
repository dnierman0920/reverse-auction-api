import { DatabaseDependency } from "../../services/databaseDependency";
import { MongoClient } from "mongodb";
import { ServerDependency } from "../../services/serverDependency";
import request from "supertest";
import { BuyerController } from "../../controllers/buyer.controller";

describe("buyerRoutes-test", function () {
  let dbd: DatabaseDependency;
  let server: ServerDependency;
  let buyerController: BuyerController;
  const buyer = {
    name: "John Doe",
  };

  beforeAll(async () => {
    dbd = new DatabaseDependency(
      "mongodb://localhost:27017",
      "reverseAuctionDBTest"
    );
    await dbd.connectToDatabase();
    server = new ServerDependency(5050);
    buyerController = new BuyerController();
  });

  afterAll(async () => {
    await dbd.client.close();
    server.server.close();
  });

  afterEach(async () => {
    await dbd.db.dropDatabase();
  });

  it("create buyer returns 201 and success message", async function () {
    const res = await request(server.app).post("/buyer").send(buyer);
    expect(res.statusCode).toEqual(201);
    const body = res.text.replace(/[\\"]/g, "");
    expect(body).toBe(
      `Successfully created a new buyer with the name ${buyer.name}`
    );
  });
  it("create buyer returns 500 and error message", async function () {
    const res = await request(server.app).post("/buyer").send();
    expect(res.statusCode).toEqual(500);
    const body = res.text;
    expect(body).toBe(
      `Failed to create a new buyer. Please include Buyer obj in req body.`
    );
  });
  it("get buyer returns 200 and a list of buyers", async function () {
    await buyerController.createBuyer(buyer);
    const res = await request(server.app).get("/buyer");
    expect(res.statusCode).toEqual(200);
    const name = res.body[0].name;
    expect(buyer.name).toBe(name);
  });
  it("delete buyer returns 202 and success message", async function () {
    const b = await buyerController.createBuyer(buyer);
    const id = b?.insertedId.toJSON();
    const res = await request(server.app).delete(`/buyer/${id}`);
    expect(res.statusCode).toEqual(202);
    const body = res.text.replace(/[\\"]/g, "");
    expect(body).toBe(`Successfully removed buyer with id ${id}`);
  });
  it("update buyer returns 200 and success message", async function () {
    const b = await buyerController.createBuyer(buyer);
    const id = b?.insertedId.toJSON();
    const res = await request(server.app).put(`/buyer/${id}`);
    expect(res.statusCode).toEqual(200);
    const body = res.text.replace(/[\\"]/g, "");
    expect(body).toBe(`Successfully updated buyer with id ${id}`);
  });
});
