import request from "supertest";
import { expect } from "chai";
import createServer from "server";

const app = createServer();

describe("buyer routes", function () {
  it("./buyers responds with 200", function (done) {
    request(app).get("./buyers").expect(200, done());
  });
});
