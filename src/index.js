import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";

dotenv.config();

const port = Number.parseInt(process.env.PORT ?? "8000", 10);

if (Number.isNaN(port)) {
  throw new Error("PORT must be a valid number.");
}

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

server.on("error", (error) => {
  console.error("Server failed to start:", error);
  process.exit(1);
});

const startDatabase = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("Startup failed:", error);
    server.close(() => {
      process.exit(1);
    });
  }
};

startDatabase();
