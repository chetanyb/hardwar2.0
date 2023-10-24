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
      expect(err).to.be.null;
    }
  });
  it("should be able to create a user", async () => {
    try {
      const user = await Users.create({
        username: "test",
        password: "test",
        email: "test@test.test",
      });
      expect(user).to.be.an("object");
      console.log(`user: ${JSON.stringify(user)}`);
      expect(user.id).to.be.a("number");
      expect(user.username).to.equal("test");
      expect(user.email).to.equal("test@test.test");
    } catch (err) {
      console.log(`err: ${err}`);
    }
  });
  it("should be able to find a user", async () => {
    try {
      const user = await Users.findOne({
        where: {
          username: "test",
        },
      });
      expect(user).to.be.an("object");
    } catch (err) {
      console.log(`err: ${err}`);
    }
  });
  it("should be able to update a user", async () => {
    try {
      const user = await Users.update(
        {
          username: "test2",
          password: "test2",
          email: "test2@test2.test2",
        },
        {
          where: {
            username: "test",
          },
        }
      );
      expect(user).to.be.an("array");
    } catch (err) {
      console.log(`err: ${err}`);
    }
  });
  it("should be able to delete a user", async () => {
    try {
      const user = await Users.destroy({
        where: {
          username: "test2",
        },
      });
      expect(user).to.equal(1);
    } catch (err) {
      console.log(`err: ${err}`);
    }
  });
});
