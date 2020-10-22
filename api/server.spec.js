const supertest = require("supertest");
const server = require("./server.js");

describe('server.js', () => {
    describe('Is the API up', () => {
        it('returns status code 200', () => {
            return supertest(server)
                .get("/")
                .then(res => {
                    expect(res.status).toBe(200);
                });
        })
        it('returns body with type json', () => {
            return supertest(server)
                .get("/")
                .then(res => {
                    expect(res.type).toMatch(/json/i);
                });
        });
        it('returns body of', () => {
            return supertest(server)
            .get("/")
            .then(res=> {
                expect(res.body).toEqual({ api: "running" })
            })
        })
    });
}) 