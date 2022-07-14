import mongoose from "mongoose";
export const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    lastName: String,
    address: String,
    age: Number,
    phone: Number,
    image: String,
    username: String,
    email: String,
    password: String,
  })
);