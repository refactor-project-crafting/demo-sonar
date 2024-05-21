import request from "supertest";
import app from "../../../server/app";
import { type Gentleman } from "../../types";
import gentlemen from "../../data";

describe("Given a GET /gentlemen endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a status code 200 and a list of gentlemen", async () => {
      const response = await request(app).get("/gentlemen").expect(200);

      const body = response.body as { gentlemen: Gentleman[] };

      expect(body.gentlemen).toEqual(gentlemen);
    });
  });
});
