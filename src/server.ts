import express, { Express, RequestHandler } from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import morgan, { FormatFn, Morgan } from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

import authRoutes from "./routes/auth";
import postRoutes from "./routes/posts";
import subRoutes from "./routes/subs";
import miscRoutes from "./routes/misc";
import userRoutes from "./routes/users";

import trim from "./middleware/trim";

const app: Express = express();
const PORT = process.env.PORT;

app.use(express.json() as RequestHandler);
app.use(morgan("dev") as RequestHandler);
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
);
app.use(trim);
app.use(cookieParser());

app.use(express.static("public"));

app.get("/api", (_, res) => res.send("Hello World"));
app.use("/api/auth", authRoutes);
app.use("/api/subs", subRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/misc", miscRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);

  try {
    await createConnection();
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
});
