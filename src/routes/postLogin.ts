import { verify } from "argon2";
import { Request, Response } from "express";
import { sendResponse } from "../common";
import { userModel } from "../db";
import RequestUser from "./RequestUser.interface";

const postLogin = async (req: Request, res: Response) => {
  if (!(req.body?.username && req.body?.password)) {
    return sendResponse(res, 400, { message: "Body is incomplete." });
  }
  const { username, password } = req.body as RequestUser;

  try {
    const result = await userModel.findOne({ username: username });
    if (!result) {
      return sendResponse(res, 401, {
        message: "Wrong username or password",
      });
    }
    const isCorrect = await verify(result.password, password!);
    if (!isCorrect) {
      return sendResponse(res, 401, {
        message: "Wrong username or password",
      });
    }
    return sendResponse(res, 200, {
      message: "Succesfully logged in.",
      cryptoAddress: result.cryptoAddress,
    });
  } catch (e) {
    return sendResponse(res, 500, {
      message: e.message,
    });
  }
};

export default postLogin;
