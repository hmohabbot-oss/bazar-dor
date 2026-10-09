import { MongoClient } from "mongodb";
import nextEnv from "@next/env";
const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is missing from .env.local");

console.log("Connecting to MongoDB...");
const client = new MongoClient(uri);

try {
  await client.connect();
  console.log("SUCCESS: MongoDB Connected Successfully!");
  await client.close();
} catch (err) {
  console.error("FAILED:", err.message);
}
