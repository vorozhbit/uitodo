import express from "express";
import listRouter from "./list";
import itemRouter from "./item";

const router = express.Router();

router.use("/lists", listRouter);
router.use("/items", itemRouter);

export default router;
