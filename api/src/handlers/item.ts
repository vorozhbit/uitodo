import { NextFunction, Request, Response } from "express";
import { HttpAppError, ITEM_NOT_FOUND } from "../error";
import {
  createNewItem,
  deleteItemData,
  findItemById,
  findListById,
  updateItemData,
} from "../services";

export const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { listId, text } = req.body;

  try {
    const list = await findListById(listId);

    if (!list) {
      throw new HttpAppError(400, ITEM_NOT_FOUND);
    }

    const item = await createNewItem(listId, text);

    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

export const updateItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { completed, text } = req.body;
  const id = req.params.id;

  try {
    const item = await findItemById(id);

    if (!item) {
      throw new HttpAppError(400, ITEM_NOT_FOUND);
    }

    const upd = await updateItemData(id, text, completed);

    res.status(200).json(upd);
  } catch (error) {
    next(error);
  }
};

export const deleteItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id;

  try {
    const item = await findItemById(id);

    if (!item) {
      throw new HttpAppError(400, ITEM_NOT_FOUND);
    }

    const del = await deleteItemData(id);

    res.status(200).json(del);
  } catch (error) {
    next(error);
  }
};
