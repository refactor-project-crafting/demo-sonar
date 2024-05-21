import request from "supertest";
import app from "../../server/app";

describe("Given a GET / endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with status 200 and a message 'OK'", async () => {
      const expectedMessage = "OK";
      const expectedStatusCode = 200;

      const response = await request(app).get("/").expect(expectedStatusCode);

      const body = response.body as { message: string };

      expect(body.message).toBe(expectedMessage);
    });
  });
});
