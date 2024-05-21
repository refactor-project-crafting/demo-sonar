import request from "supertest";
import app from "../../../server/app";
import { type Gentleman, type GentlemanData } from "../../types";

describe("Given a POST /gentlemen endpoint", () => {
  describe("When it receives a request with the gentleman Frank of She-light's data", () => {
    test("Then it should respond with a status code 201 and the gentleman Frank of She-light", async () => {
      const newGentlemanData: GentlemanData = {
        name: "Frank of she-light",
        profession: "Guitarist",
        status: "RIP",
        twitter: "guilinguilinguilin",
        picture: "pacou.jpg",
        alternativeText: "Pacou tocando la guitarra",
        selected: false,
      };

      const response = await request(app)
        .post("/gentlemen")
        .send(newGentlemanData)
        .expect(201);

      const body = response.body as { newGentleman: Gentleman };

      expect(body.newGentleman).toEqual(
        expect.objectContaining(newGentlemanData)
      );
    });
  });
});
