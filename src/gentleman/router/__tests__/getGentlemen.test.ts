import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../../server/app";
import { type GentlemanStructure } from "../../types";
import connectToDatabase from "../../../database";
import mongoose from "mongoose";
import Gentleman from "../../model/Gentleman";
import { arthurMock, littleOneMock } from "../../mocks/gentlemenMocks";

let mongod: MongoMemoryServer;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const mongoUrl = mongod.getUri();

  await connectToDatabase(mongoUrl);

  await Gentleman.create(arthurMock, littleOneMock);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe("Given a GET /gentlemen endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a status code 200 and a list of gentlemen", async () => {
      const response = await request(app).get("/gentlemen").expect(200);

      const body = response.body as { gentlemen: GentlemanStructure[] };

      expect(body.gentlemen).toContainEqual(arthurMock);
      expect(body.gentlemen).toContainEqual(littleOneMock);
    });
  });
});
