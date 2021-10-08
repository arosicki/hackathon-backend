import { Response } from "express";
import responseHeaders from "./responseHeaders";

const sendRespose = (res: Response, code: number, data: object) => {
  res.header(responseHeaders);
  res.statusCode = code;
  res.send(data);
};

export default sendRespose;
