import mongoose from "mongoose";

const connetDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log("Database Connected!")
    }
    catch (err: any) {
        console.error("Error connecting to database", err)
        process.exit(1)
    }
}
export default connetDB;