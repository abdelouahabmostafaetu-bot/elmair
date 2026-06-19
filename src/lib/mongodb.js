import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "almeiyar";

// Reuse the connection across hot reloads / serverless invocations.
let cached = global._mongoCache;
if (!cached) cached = global._mongoCache = { client: null, promise: null };

export async function getDb() {
  if (!uri) throw new Error("MONGODB_URI is not set");
  if (!cached.promise) {
    const client = new MongoClient(uri);
    cached.promise = client.connect();
  }
  cached.client = await cached.promise;
  return cached.client.db(dbName);
}

// Turn a Mongo document into a plain JSON-safe object.
export function serialize(doc) {
  if (!doc) return doc;
  const { _id, ...rest } = doc;
  return { id: _id ? String(_id) : undefined, ...rest };
}
