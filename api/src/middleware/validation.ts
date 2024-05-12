import { NextFunction, Request, Response } from "express";
import { isValidUUID } from "../utils";
import {
  HttpAppError,
  INCORRECT_BODY_PARAMS,
  INCORRECT_QUERY_PARAMS,
} from "../error";

export const validateId = (id: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const uuid = req.params[id];

    if (!uuid || !isValidUUID(uuid)) {
      throw new HttpAppError(400, INCORRECT_QUERY_PARAMS);
    }

    next();
  };
};

export const validateListData = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title } = req.body;

  if (!title || typeof title !== "string") {
    throw new HttpAppError(400, INCORRECT_BODY_PARAMS);
  }

  next();
};

export const validateItemCreateData = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { listId, text } = req.body;

  if (!listId || !isValidUUID(listId) || !text || typeof text !== "string") {
    throw new HttpAppError(400, INCORRECT_BODY_PARAMS);
  }

  next();
};

export const validateItemUpdateData = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { completed, text } = req.body;

  if (
    completed === undefined ||
    typeof completed !== "boolean" ||
    !text ||
    typeof text !== "string"
  ) {
    throw new HttpAppError(400, INCORRECT_BODY_PARAMS);
  }

  next();
};
