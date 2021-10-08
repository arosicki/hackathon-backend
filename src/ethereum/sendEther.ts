import { web3 } from "./index";

const sendEther = async (senderaddress: string, receiveradress: string, amount: string) => {
  try {
    let tx = {
      to: receiveradress,
      from: senderaddress,
      value: 0,
      gas: 0,
    };
    const gas = await web3.eth.estimateGas(tx);
    tx.value = Number(web3.utils.toWei(amount, "ether")) - gas * Number(web3.eth.getGasPrice());
    tx.gas = gas;
    await web3.eth.sendTransaction(tx);
  } catch (error) {
    console.error(error.message);
  }

  // .once("sending", function (payload) {})
  // .once("sent", function (payload) {})
  // .once("transactionHash", function (hash) {})
  // .once("receipt", function (receipt) {})
  // .on("confirmation", function (confNumber, receipt, latestBlockHash) {})
  // .on("error", function (error) {})
  // .then(function (receipt) {});
};

export default sendEther;
