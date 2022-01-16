import app from "../app";
import supertest from 'supertest'

describe("API works", () => {
  it("Handles check request", async () => {
    const result = await supertest(app).get("/");
    expect(result.text).toEqual("API works!");
    expect(result.statusCode).toEqual(200);
  });
});