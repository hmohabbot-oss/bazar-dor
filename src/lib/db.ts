import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("অনুগ্রহ করে .env.local ফাইলে MONGODB_URI যোগ করুন");
}

const options = {
  connectTimeoutMS: 20000,
  serverSelectionTimeoutMS: 20000,
};

const globalWithMongo = globalThis as typeof globalThis & {
  _mongoClient?: MongoClient;
};

export const mongoClient =
  process.env.NODE_ENV === "development"
    ? (globalWithMongo._mongoClient ??= new MongoClient(uri, options))
    : new MongoClient(uri, options);

// MongoClient.db() is synchronous; the driver connects on the first operation.
export const mongoDb = mongoClient.db("bazardor");
