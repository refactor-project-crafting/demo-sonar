import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../../server/app";
import { type GentlemanStructure, type GentlemanData } from "../../types";
import connectToDatabase from "../../../database";
import mongoose from "mongoose";
import Gentleman from "../../model/Gentleman";

let aServerNotAserver: MongoMemoryServer;

const paulData: GentlemanData = {
  name: "Paul Bikes",
  profession: "Assaulter",
  status: "Alive",
  twitter: "@paul🏍️🏍️🏍️",
  picture: "paul.jpg",
  alternativeText: "Paul asking machiruladas to his female guests",
  selected: false,
};

const createPaul = async () => {
  await Gentleman.create(paulData);
};

beforeAll(async () => {
  aServerNotAserver = await MongoMemoryServer.create();
  const mongoDbUrl = aServerNotAserver.getUri();

  await connectToDatabase(mongoDbUrl);
});

beforeEach(async () => {
  await createPaul();
});

afterEach(async () => {
  await Gentleman.deleteMany().exec();
});

afterAll(async () => {
  await mongoose.disconnect();

  await aServerNotAserver.stop();
});

describe("Given a POST /gentlemen endpoint", () => {
  const newGentlemanData: GentlemanData = {
    name: "Frank of she-light",
    profession: "Guitarist",
    status: "RIP",
    twitter: "guilinguilinguilin",
    picture: "pacou.jpg",
    alternativeText: "Pacou tocando la guitarra",
    selected: false,
  };

  describe("When it receives a request with the gentleman Frank of She-light's data", () => {
    test("Then it should respond with a status code 201 and the gentleman Frank of She-light", async () => {
      const response = await request(app)
        .post("/gentlemen")
        .send(newGentlemanData)
        .expect(201);

      const body = response.body as { newGentleman: GentlemanStructure };

      expect(body.newGentleman).toEqual(
        expect.objectContaining(newGentlemanData)
      );
    });
  });

  describe("When it receives a request with a gentleman's wrong data", () => {
    test("Then it should respond with a status code 400 and an error message 'Invalid gentleman format'", async () => {
      const expectedErrorMessage = "Invalid gentleman format";
      const expectedStatusCode = 400;
      const newGentlemanWrongData: Partial<GentlemanData> = {
        ...newGentlemanData,
      };
      delete newGentlemanWrongData.name;

      const response = await request(app)
        .post("/gentlemen")
        .send(newGentlemanWrongData)
        .expect(expectedStatusCode);

      const body = response.body as { error: string };

      expect(body.error).toBe(expectedErrorMessage);
    });
  });

  describe("When it receives a request with an existent Paul Bikes gentleman's data", () => {
    test("Then it should respond with status code 409 and an error message 'Gentleman already exists'", async () => {
      const expectedStatusMessage = "Gentleman already exists";
      const expectedStatusCode = 409;

      const response = await request(app)
        .post("/gentlemen")
        .send(paulData)
        .expect(expectedStatusCode);

      const body = response.body as { error: string };

      expect(body.error).toBe(expectedStatusMessage);
    });
  });
});
