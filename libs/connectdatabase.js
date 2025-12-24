import mongoose from "mongoose";
import { MONGODB_URI } from "./config/configuration";

export async function connectDatabase() {
  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB is already connected");
    return;
  }
  if (mongoose.connection.readyState === 2) {
    console.log("MongoDB connection is in progress");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "vote-application",
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(error);
    throw new Error("Could not connect to MongoDB");
  }
}
