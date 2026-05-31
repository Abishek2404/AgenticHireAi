import dotenv from "dotenv";
import { createApp } from "../server/src/app.js";
import { connectDatabase } from "../server/src/config/database.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "server/.env" });
}

const app = createApp();
let databasePromise;

function ensureDatabase() {
  if (!databasePromise) {
    databasePromise = connectDatabase().catch((error) => {
      databasePromise = null;
      throw error;
    });
  }
  return databasePromise;
}

export default async function handler(req, res) {
  try {
    await ensureDatabase();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: {
        message: "Database connection failed",
        details: process.env.NODE_ENV === "production" ? undefined : error.message
      }
    });
  }

  req.url = req.url.replace(/^\/api(?=\/|$)/, "") || "/";
  return app(req, res);
}
