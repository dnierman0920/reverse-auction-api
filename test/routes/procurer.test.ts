import request from "supertest";
import { expect } from "chai";
import createServer from "server";

const app = createServer();

describe("procurer routes", function () {
  it("./procurers responds with 200", function (done) {
    request(app).get("./procurers").expect(200, done());
  });
});
