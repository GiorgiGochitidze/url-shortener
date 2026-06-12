import mongoose, { Schema } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  createdAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

export const User =
  mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema);
