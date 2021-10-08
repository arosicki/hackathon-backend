import { model, connect } from "mongoose";
import { coinSchema, userSchema } from "./schema";

const connectToDB = async () => {
  await connect(process.env.DB_CONN_STRING!);
};

const userModel = model("users", userSchema);
const coinsModel = model("coins", coinSchema);

export { userModel, coinsModel, connectToDB };
