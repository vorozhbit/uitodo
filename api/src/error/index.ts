export const INCORRECT_BODY_PARAMS =
  "Mandatory body parameters missing or have incorrect type.";
export const INCORRECT_QUERY_PARAMS =
  "Parameter missing or has incorrect type.";

export const LIST_NOT_FOUND = "List not found.";
export const ITEM_NOT_FOUND = "Item not found.";

export class HttpAppError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
