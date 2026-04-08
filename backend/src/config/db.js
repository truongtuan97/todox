import mongoose from 'mongoose';

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

        console.log("Connect to db successfully")
    } catch (error) {
        console.error("Loi khi ket noi db", error);
        process.exit(1);
    }
}