import express from "express";
import { createItem, updateItem, deleteItem } from "../handlers";
import {
  validateId,
  validateItemCreateData,
  validateItemUpdateData,
} from "../middleware";

const router = express.Router();

router.post("/", validateItemCreateData, createItem);
router.put("/:id", validateId("id"), validateItemUpdateData, updateItem);
router.delete("/:id", validateId("id"), deleteItem);

export default router;
