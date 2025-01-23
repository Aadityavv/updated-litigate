// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI; // Use the MONGODB_URI from your .env.local
// const dbName = process.env.MONGODB_DB; // Use the MONGODB_DB from your .env.local
// const options = {};

// let client;
// let clientPromise;

// if (!uri || !dbName) {
//   throw new Error("Please define MONGODB_URI and MONGODB_DB in your .env.local file");
// }

// if (process.env.NODE_ENV === "development") {
//   // Use global for caching during development
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   // Always create a new client in production
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// export async function connectToDatabase() {
//   try {
//     const client = await clientPromise;
//     const db = client.db(dbName); // Use the database name from .env.local
//     console.log("Connected to MongoDB");
//     return { client, db };
//   } catch (error) {
//     console.error("Failed to connect to MongoDB", error);
//     throw new Error("Could not connect to MongoDB");
//   }
// }
