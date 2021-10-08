import express from "express";
import dotenv from "dotenv";
import { sendResponse } from "./common";
import getLeaderboard from "./routes/getLeaderboard";
import postLogin from "./routes/postLogin";
import postRegister from "./routes/postRegister";
import { connectToDB } from "./db/index";
import { web3, runExchange } from "./ethereum/index";

dotenv.config();

(async () => {
  const PORT = process.env.PORT!;
  connectToDB();
  web3.setProvider("http://127.0.0.1:8545");
  web3.eth.defaultAccount = process.env.TEMP_MAIN_ADDRESS!;
  const app = express();
  app.use(express.json());

  app.get("/", (_req: any, res: express.Response) =>
    sendResponse(res, 200, {
      message: "Server is up. Endpoints are all yours.",
    })
  );

  app.get("/leaderboard/:username", getLeaderboard);
  app.get("/leaderboard", getLeaderboard);
  app.post("/login", postLogin);
  app.post("/register", postRegister);

  app.listen(PORT, () => {
    console.log(`[Log]: Server is running at https://localhost:${PORT}`);
  });
  setInterval(runExchange.bind(web3), 1000 * 60 * 60 * 24);
})();
