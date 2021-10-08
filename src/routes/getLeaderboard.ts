import { Request, Response } from "express";
import { coinsModel } from "../db";
import { sendResponse } from "../common";

interface getParams {
  page?: string;
  resultsPerPage?: string;
}

const getLeaderboard = async (req: Request, res: Response) => {
  if (req.params.username) {
    try {
      const result = await coinsModel.findOne({ username: req.params.username });

      if (!result) {
        return sendResponse(res, 404, { message: `No username: ${req.params.username} found` });
      }
      return sendResponse(res, 200, { username: result.username, nOfCoins: result.nOfCoins });
    } catch (e) {
      return sendResponse(res, 500, e.message);
    }
  }
  const { page, resultsPerPage } = req.query as getParams;
  let queryPage = 1;
  let queryResultsPerPage = 10;
  if (page) {
    const pageNumber = +page;
    if (!Number.isNaN(pageNumber) && pageNumber > 0) {
      queryPage = pageNumber;
    } else {
      return sendResponse(res, 400, { message: "pageNumber must be a positive number" });
    }
  }
  if (resultsPerPage) {
    const resultsPerPageNumber = +resultsPerPage;
    if (!Number.isNaN(resultsPerPageNumber) && resultsPerPageNumber > 0) {
      queryResultsPerPage = resultsPerPageNumber;
    } else {
      return sendResponse(res, 400, { message: "resultsPerPage must be a positive number" });
    }
  }

  try {
    const result = await coinsModel
      .find()
      .sort({ nOfCoins: "desc" })
      .skip((queryPage - 1) * queryResultsPerPage)
      .limit(queryResultsPerPage);
    if (result.length === 0) {
      return sendResponse(res, 404, { message: "No users found, try adujusting query params" });
    }
    return sendResponse(
      res,
      200,
      result.map((el: { username: string; nOfCoins: number }) => ({ username: el.username, nOfCoins: el.nOfCoins }))
    );
  } catch (e) {
    return sendResponse(res, 500, e.message);
  }
};

export default getLeaderboard;
