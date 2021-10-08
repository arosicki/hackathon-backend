import { hash } from "argon2";
import { Request, Response } from "express";
import { coinsModel, userModel } from "../db/index";
import { sendResponse } from "../common";
import RequestUser from "./RequestUser.interface";
import { web3 } from "../ethereum/index";

const postRegister = async (req: Request, res: Response) => {
  if (!(req.body?.username && req.body?.password)) {
    return sendResponse(res, 400, { message: "Body is incomplete." });
  }

  const { username, password } = req.body as RequestUser;

  if (!username.match(/^[\w\d]{5,26}$/)) {
    return sendResponse(res, 400, {
      message:
        "Login must be between 5 and 26 chars long and must contain only numbers and characters",
    });
  }

  if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/g)) {
    return sendResponse(res, 400, {
      message:
        "Password must contain 8-32 characters, digit, uppercase and lowercase letters",
    });
  }

  try {
    const result = await userModel.findOne({ username: username });

    if (result) {
      return sendResponse(res, 409, {
        message: "Username is already taken",
      });
    }
    const hashedPassword = await hash(password);
    const address = await web3.eth.personal.newAccount(
      process.env.DEFAULT_PASSWORD!
    );
    const newUser = new userModel({
      username: username,
      password: hashedPassword,
      cryptoAddress: address,
    });
    const newCoinbase = new coinsModel({
      username: username,
      nOfCoins: 0,
    });

    await newUser.save();
    await newCoinbase.save();

    return sendResponse(res, 201, {
      message: "Succesfully registered.",
      cryptoAddress: newUser.cryptoAddress,
    });
  } catch (e) {
    return sendResponse(res, 500, {
      message: e.message,
    });
  }
};

export default postRegister;
