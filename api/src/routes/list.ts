import express from "express";
import { createList, getListById, getLists, updateList } from "../handlers";
import { validateId, validateListData } from "../middleware";

const router = express.Router();

router.post("/", validateListData, createList);
router.get("/:id", validateId("id"), getListById);
router.put("/:id", validateId("id"), validateListData, updateList);
router.get("/", getLists);

export default router;
