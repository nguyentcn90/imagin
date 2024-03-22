import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface IMongooseConnection {
	connection: Mongoose | null;
	promise: Promise<Mongoose> | null;
}

let cached: IMongooseConnection = (global as any).mongoose;

if (!cached) {
	cached = (global as any).mongoose = { connection: null, promise: null };
}

export const connectToDatabase = async () => {
	if (cached.connection) return cached.connection;

	if (!MONGODB_URL) {
		throw new Error("Minssing MongoDB URL");
	}

	cached.promise =
		cached.promise ||
		mongoose.connect(MONGODB_URL, {
			dbName: "imagin",
			bufferCommands: false,
		});

	cached.connection = await cached.promise;
	return cached.connection;
};
