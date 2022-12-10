const router = require("../api/routes/users.js");
const request = require("supertest");
const app = require("../app.js");
const db = require("../api/psql-con");
// import {
//   validUser,
//   emailExists,
//   usernameExists,
// } from "../api/routes/userFunctions";

// jest.mock("../api/routes/userFunctions", () => jest.fn(() => true));

it("returns success message when input is valid and email and username are available", async () => {
  await db.query("DELETE FROM users WHERE email = $1", ["abcd@abcde.com"]);
  await request(app)
    .post("/api/user/signup")
    .send({
      email: "abcd@abcde.com",
      password: "Aa12s345678",
      username: "prasad123",
      c_password: "Aa12s345678",
    })
    .expect(201);
});

it("sign in", async () => {
  await request(app)
    .post("/api/user/signin")
    .send({
      email: "abcd@abcde.com",
      password: "Aa12s345678",
    })
    .expect(200);
});

it("is logged", async () => {
  const response = await request(app)
    .post("/api/user/signin")
    .send({
      email: "abcd@abcde.com",
      password: "Aa12s345678",
    })
    .expect(200);

  const res = await request(app)
    .post("/api/user/islogged")
    .send({
      token: response.body.token,
    })
    .expect(200);

  expect(res.body).toMatchObject({
    isLogged: true,
    email: response.body.user.email,
    username: response.body.user.username,
  });
});
