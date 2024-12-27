import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // MongoDB connection string
const dbName = "litigate"; // Database name

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  // Return cached connection if available
  if (cachedDb) {
    return { db: cachedDb, client: cachedClient };
  }

  // Create a new connection
  const client = new MongoClient(uri);

  await client.connect(); // Ensure the client connects to MongoDB
  const db = client.db(dbName);

  // Cache the connection
  cachedClient = client;
  cachedDb = db;

  return { db, client };
}
