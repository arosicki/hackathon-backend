import { userModel } from "../db/index";

const buildWallet = async () => {
  let wallet: string[] = [];
  const result = await userModel.find().select("cryptoAddress -_id").exec();
  const addresses = result.filter((el) => el.cryptoAddress != undefined);
  addresses.forEach((a) => {
    wallet.push(a.cryptoAddress);
  });

  return wallet;
};
export default buildWallet;
