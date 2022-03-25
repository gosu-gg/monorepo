import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

const corsOptions =
  process.env.NODE_ENV === "production" ? {} : { origin: "*" };

app.use(cors(corsOptions), helmet(), express.json());
app.listen(port, () => console.log(`it's alive on http://localhost:${port}`));

app.get("/", (_, res) => {
  res.send("App is running");
});
