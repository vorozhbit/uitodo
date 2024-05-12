import { describe, expect, it } from "vitest";
import app from "../server/app";
import request from "supertest";
import {
  INCORRECT_BODY_PARAMS,
  INCORRECT_QUERY_PARAMS,
  ITEM_NOT_FOUND,
} from "../error";

let listId: string;
let itemId: string;

describe("To-Do Items", function () {
  it("create list", async () => {
    const res = await request(app)
      .post("/api/lists")
      .send({ title: "New List" });

    listId = res.body.id;
    expect(res.status).toEqual(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toEqual("New List");
  });

  it("add item to list", async () => {
    const res = await request(app)
      .post("/api/items")
      .send({ listId: listId, text: "Buy car" });

    expect(res.status).toEqual(201);
    expect(res.body.text).toEqual("Buy car");
    expect(res.body.listId).toEqual(listId);
    expect(res.body.id).toBeDefined();
    expect(res.body.order).toEqual(1);
    expect(res.body.completed).toEqual(false);

    itemId = res.body.id;
  });

  it("update item", async () => {
    const res = await request(app)
      .put(`/api/items/${itemId}`)
      .send({ text: "Buy house", completed: true });

    expect(res.status).toEqual(200);
    expect(res.body.text).toEqual("Buy house");
    expect(res.body.id).toEqual(itemId);
    expect(res.body.order).toEqual(1);
    expect(res.body.completed).toEqual(true);
  });

  it("check item in the list", async () => {
    const res = await request(app).get(`/api/lists/${listId}`);

    expect(res.status).toEqual(200);
    expect(res.body.id).toEqual(listId);
    expect(res.body.items).toEqual([expect.objectContaining({ id: itemId })]);
  });

  it("delete item", async () => {
    const res = await request(app).delete(`/api/items/${itemId}`);

    expect(res.status).toEqual(200);
    expect(res.body.id).toEqual(itemId);
  });
});

describe("To-Do Items Validation", function () {
  it("create item with incorrect data param", async () => {
    const res = await request(app)
      .post("/api/items")
      .send({ listIds: listId, texts: "To-do item" });

    expect(res.status).toEqual(400);
    expect(res.body.error).toEqual(INCORRECT_BODY_PARAMS);
  });

  it("create item with incorrect data types", async () => {
    const res = await request(app)
      .post("/api/items")
      .send({ listId: true, text: 123 });

    expect(res.status).toEqual(400);
    expect(res.body.error).toEqual(INCORRECT_BODY_PARAMS);
  });

  it("update item with incorrect data param", async () => {
    const res = await request(app)
      .put(`/api/items/${itemId}`)
      .send({ completeds: false, texts: "New title" });

    expect(res.status).toEqual(400);
    expect(res.body.error).toEqual(INCORRECT_BODY_PARAMS);
  });

  it("update item with incorrect data type", async () => {
    const res = await request(app)
      .put(`/api/items/${itemId}`)
      .send({ completed: "true", text: 123 });

    expect(res.status).toEqual(400);
    expect(res.body.error).toEqual(INCORRECT_BODY_PARAMS);
  });

  it("delete item with incorrect id", async () => {
    const res = await request(app).delete(`/api/items/123`);

    expect(res.status).toEqual(400);
    expect(res.body.error).toEqual(INCORRECT_QUERY_PARAMS);
  });

  it("delete item which do not exists", async () => {
    const res = await request(app).delete(`/api/items/${itemId}`);

    expect(res.status).toEqual(400);
    expect(res.body.error).toEqual(ITEM_NOT_FOUND);
  });
});
