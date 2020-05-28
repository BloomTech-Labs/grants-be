const supertest = require("supertest");
const server = require("../api/server");
const db = require("../knex/knex");
const knexCleaner = require("knex-cleaner");

beforeAll(async () => {
    // await db.migrate.latest();
    await knexCleaner.clean(db, {
        ignoreTables: ["knex_migrations", "knex_migrations_lock"],
    });
    // you can here also seed your tables, if you have any seeding files
});
afterAll(() => {
    //   return db.migrate.rollback().then(() => db.destroy());
    return db.destroy();
});

test("create a user", async () => {
    const res = await supertest(server).post("/api/auth/register").send({
        email: "test@gmail.com",
        password: "test",
        user_type: "writer",
    });
    expect(res.status).toBe(201);
    expect(res.type).toBe("application/json");
    expect(res.body.email).toBe("test@gmail.com");
});

test("login a user", async () => {
    const res = await supertest(server)
        .post("/api/auth/login")
        .send({ email: "test@gmail.com", password: "test" });
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.userType).toBe("writer");
});

test("try to login without email", async () => {
    const res = await supertest(server)
        .post("/api/auth/login")
        .send({ email: "", password: "test" });
    expect(res.status).toBe(401);
});

