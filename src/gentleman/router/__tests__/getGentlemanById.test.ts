import request from "supertest";
import app from "../../../server/app";
import { type GentlemanStructure } from "../../types";

/* Describe("Given a GET /gentleman/:id endpoint", () => {
  describe("When it receives a request with id '1'", () => {
    test("Then it should respond with status code 200 and a gentleman called John and a Half", async () => {
      const gentlemanId = "1";
      const expectedStatusCode = 200;
      const expectedGentlemanName = "John and a Half";

      const response = await request(app)
        .get(`/gentlemen/${gentlemanId}`)
        .expect(expectedStatusCode);

      const body = response.body as {
        gentleman: GentlemanStructure;
      };

      expect(body.gentleman.name).toBe(expectedGentlemanName);
    });
  });

  describe("When it receives a request with id '10'", () => {
    test("Then it should respond with status 404 and an error message 'Gentleman not found'", async () => {
      const gentlemanId = "10";
      const expectedStatusCode = 404;
      const expectedErrorMessage = "Gentleman not found";

      const response = await request(app)
        .get(`/gentlemen/${gentlemanId}`)
        .expect(expectedStatusCode);

      const body = response.body as { error: string };

      expect(body.error).toBe(expectedErrorMessage);
    });
  });
});
 */
