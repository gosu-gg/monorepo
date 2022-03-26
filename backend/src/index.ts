import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import getClashBattleLog from "./helpers";

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

app.get("/battle-result", async (_, res) => {
  const data = await getClashBattleLog("%23PUPP8LPV");
  res.send(data);
});
