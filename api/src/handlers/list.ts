import { NextFunction, Request, Response } from "express";
import { HttpAppError, LIST_NOT_FOUND } from "../error";
import {
  createNewList,
  findAllLists,
  findListById,
  updateListData,
} from "../services";

export const createList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title } = req.body;

  try {
    const list = await createNewList(title);

    res.status(201).json(list);
  } catch (error) {
    next(error);
  }
};

export const updateList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title } = req.body;
  const id = req.params.id;

  try {
    const list = await findListById(id);

    if (!list) {
      throw new HttpAppError(404, LIST_NOT_FOUND);
    }

    const upd = await updateListData(id, title);
    res.status(200).json(upd);
  } catch (error) {
    next(error);
  }
};

export const getListById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id;

  try {
    const list = await findListById(id, true);

    if (!list) {
      throw new HttpAppError(404, LIST_NOT_FOUND);
    }

    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const getLists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const lists = await findAllLists();

    res.status(200).json(lists);
  } catch (error) {
    next(error);
  }
};
