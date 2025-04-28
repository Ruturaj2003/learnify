import mongoose from 'mongoose';

// Get the Mongo URI from environment variables
const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) throw new Error('Please define MONGO_URI in .env.local');

// Define a type for the cached connection
interface CachedConnection {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// Use the type for the global object
declare global {
  let mongoose: CachedConnection;
}
// @ts-expect-error I dont know
const cached: CachedConnection = global.mongoose || {
  conn: null,
  promise: null,
};

export async function connectToDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI, {
        dbName: 'learnify',
        bufferCommands: false,
      })
      .then((mongoose) => mongoose.connection); // Ensures we get the connection
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
