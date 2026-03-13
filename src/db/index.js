import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const getMongoUri = () => {
  const rawMongoUri = process.env.MONGODB_URI?.trim();

  if (!rawMongoUri) {
    throw new Error("MONGODB_URI is not defined.");
  }

  let parsedUri;

  try {
    parsedUri = new URL(rawMongoUri);
  } catch {
    throw new Error("MONGODB_URI must be a valid MongoDB connection string.");
  }

  if (!parsedUri.pathname || parsedUri.pathname === "/") {
    parsedUri.pathname = `/${DB_NAME}`;
  }

  return parsedUri.toString();
};

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(getMongoUri(), {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(
      `MongoDB connected. DB HOST: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default connectDB;
