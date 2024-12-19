import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO);
    console.log('MOngo deb conneted successfully');
    
    // console.log(
    //   `Connected to Mongodb database : ${connect.connection.name}`.bgGreen
    // );
  } catch (error) {
    console.log(`Error in mongoDB ${error}`.bgRed);
  }
};
export default connectDB;