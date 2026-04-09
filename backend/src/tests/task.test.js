import request from 'supertest';
import app from '../app';

let token;

beforeEach(async () => {
    await request(app).post("/api/auth/register").send({
        email: "test@test.com",
        password: "123456"
    });

    const res = await request(app).post("/api/auth/login").send({
        email: "test@test.com",
        password: "123456"
    });

    token = res.body.token;
});

describe("task API", () => {
    it ("should create task", async () => {
        const res = await request(app).post("/api/tasks").set("Authorization", `Bearer ${token}`).send({title: "Test test"});

        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe("Test test");
    });

    it ("should only return user tasks", async () => {
        // user A
        await request(app).post("/api/tasks").set("Authorization", `Bearer ${token}`).send({title: "Task A"});

        // user B
        await request(app).post("/api/auth/register").send({email: "user2@test.com", password: "123456"});

        const resLogin = await request(app).post("/api/auth/login").send({
            email: "user2@test.com",
            password: "123456"
        });

        const token2 = resLogin.body.token;

        await request(app).post("/api/tasks").set("Authorization", `Bearer ${token2}`).send({title: "Task B"});

        const res = await request(app).get("/api/tasks").set("Authorization", `Bearer ${token}`);

        expect(res.body.tasks.length).toBe(1);
        expect(res.body.tasks[0].title).toBe("Task A");
    });
})