import { equalExchange } from "./EqualExchange";
import { buildWallet } from "./index";
import Web3 from "web3";
import { userModel } from "../db/index";
import getBalance from "./getBalance";

const runExchange = async (web3: Web3) => {
  let wallet = await buildWallet();

  web3.eth.personal.unlockAccount(
    process.env.TEMP_MAIN_ADDRESS!,
    process.env.MAIN_ADDRESS_PASS!,
    100000
  );

  for (let i = 0; i < wallet.length; i++) {
    let user = await userModel.findOne({ cryptoAddress: wallet[i] }).exec()!;
    web3.eth.personal.unlockAccount(
      wallet[i],
      process.env.DEFAULT_PASSWORD!,
      0
    );
    equalExchange(
      user?.username!,
      wallet[i],
      web3.utils.fromWei(await getBalance(wallet[i]), "ether"),
      web3
    );
  }
};

export { runExchange };
