import { describe, expect, test } from "vitest";
import app from "../server/app";
import request from "supertest";
import { INCORRECT_BODY_PARAMS, INCORRECT_QUERY_PARAMS } from "../error";

let listId: string;

describe("To-Do Lists", function () {
  test("create list", async () => {
    const res = await request(app)
      .post("/api/lists")
      .send({ title: "New List" });

    listId = res.body.id;
    expect(res.status).toEqual(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toEqual("New List");
  });

  test("update list title", async () => {
    const res = await request(app)
      .put(`/api/lists/${listId}`)
      .send({ title: "New Title" });

    expect(res.status).toEqual(200);
    expect(res.body.title).toEqual("New Title");
  });

  test("get list", async () => {
    const res = await request(app).get(`/api/lists/${listId}`);

    expect(res.status).toEqual(200);
    expect(res.body.title).toEqual("New Title");
    expect(res.body.id).toEqual(listId);
    expect(res.body.createdAt).toBeDefined();
    expect(res.body.items).toEqual([]);
  });
});

describe("To-Do Lists Validation", function () {
  test("create list with incorrect data param", async () => {
    const res = await request(app)
      .post("/api/lists")
      .send({ text: "New List" });

    expect(res.status).toEqual(400);
    expect(res.body.error).toEqual(INCORRECT_BODY_PARAMS);
  });

  test("create list with incorrect data type", async () => {
    const res = await request(app).post("/api/lists").send({ title: 123 });

    expect(res.status).toEqual(400);
    expect(res.body.error).toEqual(INCORRECT_BODY_PARAMS);
  });

  test("update list with incorrect data param", async () => {
    const res = await request(app)
      .put(`/api/lists/${listId}`)
      .send({ text: "New title" });

    expect(res.status).toEqual(400);
    expect(res.body.error).toEqual(INCORRECT_BODY_PARAMS);
  });

  test("update list with incorrect data type", async () => {
    const res = await request(app)
      .put(`/api/lists/${listId}`)
      .send({ text: 123 });

    expect(res.status).toEqual(400);
    expect(res.body.error).toEqual(INCORRECT_BODY_PARAMS);
  });

  test("get list with invalid id", async () => {
    const res = await request(app).get("/api/lists/invalid-id");

    expect(res.status).toEqual(400);
    expect(res.body.error).toEqual(INCORRECT_QUERY_PARAMS);
  });
});
