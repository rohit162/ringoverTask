const router = require("../api/routes/users.js");
const request = require("supertest");
const app = require("../app.js");
const db = require("../api/psql-con");

it("create new entry", async () => {
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

  const response = await request(app)
    .post("/api/user/signin")
    .send({
      email: "abcd@abcde.com",
      password: "Aa12s345678",
    })
    .expect(200);

  const res = await request(app)
    .post("/api/entries/new")
    .send({
      token: response.body.token,
      header: "test header",
      subheader: "test subheader",
      category: "test category",
      content: "test content",
    })
    .expect(201);

  expect(res.body).toMatchObject({
    msg: "Your entry has been added to the database.",
  });
});

it("get entry by title", async () => {
  const res = await request(app).get("/api/entries/test%20header").expect(200);
  expect(res.body[0].header).toMatch("test header");
});

// 1. More than one page of entries
// 2. pgae 2-3 checked
// 3. results according db rows number
it("pagination testing", async () => {
  const res = await request(app).get("/api/entries/page/1").expect(200);
  console.log(res.body.length);
  expect(res.body.length).not.toBe(0);
});
