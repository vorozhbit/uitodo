import { describe, expect, it } from "vitest";
import app from "../server/app";
import request from "supertest";

describe("General routes", function () {
  it("request to non existing route", async () => {
    const res = await request(app).get("/api/url");

    expect(res.status).toEqual(404);
    expect(res.body.error).toEqual("Not Found");
  });
});
