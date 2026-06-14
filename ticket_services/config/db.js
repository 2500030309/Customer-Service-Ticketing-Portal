import mongoose from "mongoose";

export async function connectDB() {
    const dbUrl = process.env.DBURL;

    if (!dbUrl) {
        throw new Error("DBURL is missing in .env");
    }

    try {
        console.log("Connecting to MongoDB...");

        await mongoose.connect(dbUrl, {
            serverSelectionTimeoutMS: 5000
        });

        console.log("MongoDB Connected");
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
        throw err;
    }
}
