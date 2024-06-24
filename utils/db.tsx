import mongoose from "mongoose";

const connect = async () => {
    try {
        if (mongoose.connections[0].readyState) {
            console.log("Already connected to MongoDB");
            return;
        }

        await mongoose.connect(process.env.MONGO_URL as string, {
            
        });

        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("Error connecting to the database");
    }
};

export default connect;
