import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "../routes";
import { HttpAppError } from "../error";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.use("*", (req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: HttpAppError, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    const status = err.status ? err.status : 500;
    const message = err.message;
    return res.status(status).send({ error: message });
  },
);

export default app;
