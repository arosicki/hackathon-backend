import { web3 } from "./index";

const getBalance = async (useraddress: string) => {
  return web3.eth.getBalance(useraddress);
};

export default getBalance;
