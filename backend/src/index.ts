import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import setGameResult, { getGameFromContract, setWinners } from "./helpers";

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

app.get("/battle-result", async (req, res) => {
  const gameId = req.body.gameId;
  const gameData = await getGameFromContract(gameId);
  if (!gameData)  {
    res.send({error: 'Error fetching game from smart contract'});
  }
  const response = await setGameResult(gameData.gameId,gameData.player1, gameData.player2, gameData.timeStamp);
  res.send(response);
});
