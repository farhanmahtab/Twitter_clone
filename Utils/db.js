import mongoose from "mongoose";

const conncetMongoose = async () => mongoose.connect(process.env.DB_URL);
export default conncetMongoose;
