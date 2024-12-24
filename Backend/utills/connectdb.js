import mongoose from "mongoose";
export const connectdb = async() => {
    try {
        const respones = await mongoose.connect(process.env.MOGOURI);
        console.log('database connnected successfully');
        
    } catch (error) {
        console.log('error in connecting database',error);
        
    }
}