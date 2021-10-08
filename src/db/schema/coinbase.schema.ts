import { Schema } from "mongoose";

interface Coinbase {
  username: string;
  nOfCoins: number;
}

const coinSchema = new Schema<Coinbase>({
  username: String,
  nOfCoins: Number,
});

export default coinSchema;
