import { v4 as uuidv4, validate } from "uuid";

export const generateId = () => {
  return uuidv4();
};

export const isValidUUID = (id: string) => {
  return validate(id);
};
