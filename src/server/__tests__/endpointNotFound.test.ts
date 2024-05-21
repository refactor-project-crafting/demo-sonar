import request from "supertest";
import app from "../app";

describe("Given a non existent endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with status code 404 and message 'Endpoint not found'", async () => {
      const expectedStatusCode = 404;
      const expectedMessage = "Endpoint not found";

      const response = await request(app)
        .get("/unknown-endpoint")
        .expect(expectedStatusCode);

      const body = response.body as { error: string };

      expect(body.error).toBe(expectedMessage);
    });
  });
});
