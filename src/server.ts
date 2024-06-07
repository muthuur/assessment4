import express, { NextFunction, Request, Response, json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRouter from "./routes/notes";

dotenv.config();
const app = express();
app.use(json());
app.use(cors());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
  next();
});

app.use("/notes", notesRouter);

const port = 3000;

app.listen(port, () => {
  console.log(`Server running port ${port}`);
});
