import Web3 from "web3";
import { coinsModel } from "../db/index";
import getEthValue from "./getEthPrice";
import getBalance from "./getBalance";
import sendEther from "./sendEther";

const equalExchange = async (username: string, useraddress: string, balance: string, web3: Web3) => {
  const accbalance = await getBalance(useraddress);
  const ethcurrent = await getEthValue();
  let coinbase = 0;
  let coinadded = 0;

  if (Number(web3.utils.fromWei(accbalance, "ether")) >= Number(balance)) {
    try {
      sendEther(useraddress, process.env.TEMP_MAIN_ADDRESS!, balance);

      coinadded = ethcurrent * parseFloat(web3.utils.fromWei(balance, "ether"));
      const coins = await coinsModel.findOne({ username: username }).exec();
      coinbase = coins?.nOfCoins!;

      coinsModel.updateOne({ username: username }, { $set: { nOfCoins: coinbase + coinadded } }).exec();
    } catch (error) {
      console.error(error.message);
    }
  }
};
export { equalExchange };
