import { DatabaseDependency } from "../../services/databaseDependency";
import { MongoClient } from "mongodb";
import { ServerDependency } from "../../services/serverDependency";
import request from "supertest";
import { BuyerController } from "../../controllers/buyer.controller";
import { Buyer } from "models/buyer";

describe("buyerRoutes-test", function () {
  let dbd: DatabaseDependency;
  let server: ServerDependency;
  let buyerController: BuyerController;
  let buyerRequest: Buyer;
  let buyerRequest2: Buyer;

  beforeAll(async () => {
    dbd = new DatabaseDependency(
      "mongodb://localhost:27017",
      "reverseAuctionDBTest"
    );
    await dbd.connectToDatabase();
    server = new ServerDependency(5050);
  });

  afterAll(async () => {
    await dbd.client.close();
    server.server.close();
  });

  beforeEach(async () => {
    await dbd.db.dropDatabase();
    buyerController = new BuyerController();
    buyerRequest = {
      name: "John Doe",
    };
    buyerRequest2 = {
      name: "Jane Doe",
    };
  });

  it("create buyer returns 201 and success message", async function () {
    const res = await request(server.app).post("/buyer").send(buyerRequest);
    expect(res.statusCode).toEqual(201);
    const body = res.text.replace(/[\\"]/g, "");
    expect(body).toBe(
      `Successfully created a new buyer with the name ${buyerRequest.name}`
    );
  });
  it("create buyer (w/o req body)returns 400 and error message", async function () {
    const res = await request(server.app).post("/buyer").send();
    expect(res.statusCode).toEqual(400);
    const body = res.text;
    expect(body).toBe(
      `Failed to create a new buyer. Buyer obj w/ name is required.`
    );
  });
  it("create buyer (w/o buyer in req body obj)returns 400 and error message", async function () {
    const res = await request(server.app).post("/buyer").send({});
    expect(res.statusCode).toEqual(400);
    const body = res.text;
    expect(body).toBe(
      `Failed to create a new buyer. Buyer obj w/ name is required.`
    );
  });
  it("create buyer (w/ empty string for name in req body)returns 400 and error message", async function () {
    const res = await request(server.app).post("/buyer").send({ name: "" });
    expect(res.statusCode).toEqual(400);
    const body = res.text;
    expect(body).toBe(
      `Failed to create a new buyer. Buyer obj w/ name is required.`
    );
  });
  it("get buyer returns 200 and a list of buyers", async function () {
    await buyerController.createBuyer(buyerRequest);
    const res = await request(server.app).get("/buyer");
    expect(res.statusCode).toEqual(200);
    const name = res.body[0].name;
    expect(buyerRequest.name).toBe(name);
  });
  it("delete buyer returns 202 and success message", async function () {
    const b = await buyerController.createBuyer(buyerRequest);
    const id = b?.insertedId.toJSON();
    const res = await request(server.app).delete(`/buyer/${id}`);
    expect(res.statusCode).toEqual(202);
    const body = res.text.replace(/[\\"]/g, "");
    expect(body).toBe(`Successfully removed buyer with id ${id}`);
  });
  it("update buyer returns 200 and success message", async function () {
    const b = await buyerController.createBuyer(buyerRequest);
    const id = b?.insertedId.toJSON();
    const res = await request(server.app)
      .put(`/buyer/${id}`)
      .send(buyerRequest2);
    expect(res.statusCode).toEqual(200);
    const body = res.text.replace(/[\\"]/g, "");
    expect(body).toBe(`Successfully updated buyer with id ${id}`);
    const updatedBuyers = await buyerController.getBuyers();
    expect(updatedBuyers[0].name).toBe(buyerRequest2.name);
  });
});
