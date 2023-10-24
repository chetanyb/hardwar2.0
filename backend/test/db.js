const chai = require("chai");
const chaiHttp = require("chai-http");
const Users = require("../models/users");
chai.use(chaiHttp);
const expect = chai.expect;

describe("Database", () => {
  it("should be able to connect to the database", async () => {
    try {
      await Users.findAll();
    } catch (err) {
      console.log(`err: ${err}`);
      expect(err).to.be.null;
    }
  });
});
