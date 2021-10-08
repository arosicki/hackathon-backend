import { Schema } from "mongoose";

interface User {
  username: string;
  password: string;
  cryptoAddress: string;
}

const userSchema = new Schema<User>({
  username: String,
  password: String,
  cryptoAddress: String,
});

export default userSchema;
