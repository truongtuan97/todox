import request from "supertest";
import app from "../app.js";

describe("Auth API", () => {
    it ("should register user", async () => {
        const res = await request(app).post("/api/auth/register").send({
            email: 'test@test.com',
            password: '123456'
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.email).toBe("test@test.com");
    });

    it ("should login user", async () => {
        await request(app).post("/api/auth/register").send({
            email: "test@test.com",
            password: "123456"
        });

        const res = await request(app).post("/api/auth/login").send({
            email: "test@test.com",
            password: "123456"
        });

        expect(res.body.token).toBeDefined();
    });
});

