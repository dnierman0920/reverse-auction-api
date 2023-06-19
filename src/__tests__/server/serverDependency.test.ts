import { ServerDependency } from "../../services/serverDependency";

describe("serverDependency-test", function () {
  it("should successfully start a server", async function () {
    const server = new ServerDependency(5040);
    server.server.close();
  });
});
