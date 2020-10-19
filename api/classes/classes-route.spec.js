const supertest = require("supertest");
const server = require("../server.js");

describe('classes-route.js', () => {
    describe('request handler for getClasses()', () => {
        it('returns status code 200 and array of objects', async () => {
            const expectedStatusCode = 200
            const response = await supertest(server).get('/api/classes')
            expect(response.status).toEqual(expectedStatusCode);
        })
    })
}) 