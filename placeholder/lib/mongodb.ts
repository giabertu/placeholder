import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI;

let clientPromise: Promise<MongoClient>

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local")
} else {
  const client = new MongoClient(uri)
  clientPromise = client.connect();
}
export default clientPromise