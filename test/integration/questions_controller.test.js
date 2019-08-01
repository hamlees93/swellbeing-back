const supertest = require("supertest");
const app = require("../../app");
const mongoose = require("../../database/connect");
const UserModel = require("../../database/models/user_model");
const JWTService = require("../../services/jwt_service");

describe("UserModel", () => {
  let registeredUser;
  let token;
  beforeAll(() => {
    registeredUser = new UserModel({
      email: "test@test.com"
    });
    registeredUser.setPassword("test");
    registeredUser.save();
    token === JWTService.createJWT(registeredUser);
  });

  test("create a user without a token redirects", async () => {
    const userData = {
      name: "bob",
      email: "test@test.com",
      password: "password",
      type: "company"
    };
    const response = await supertest(app)
      .post("/users")
      .send(userData)
      .expect(302);
    expect(response).toBeTruthy();
  });
  test("create a user without a token redirects", async () => {
    const userData = {
      name: "Bob",
      email: "test@test.com",
      password: "password",
      type: "company"
    };
    const response = await supertest(app)
      .post("/users")
      .set("Authorization", `Bearer ${token}`)
      .send(userData)
      .expect(302);
    expect(response).toBeTruthy();
  });
});
