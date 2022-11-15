import "express-async-errors";
import express, { json } from "express";
import cors from "cors";
import mainRouter from "./routes/mainRouter";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(json());
app.use(cors());
app.use(errorHandler);
app.use(mainRouter);

export default app;