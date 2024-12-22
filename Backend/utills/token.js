import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

export const setToken = (user) => {
    const token = jwt.sign(
        {
            userId: user._id,
            email: user.email,
        }, process.env.JWT_SECERET, {
        expiresIn: '10m'
    });

    return token;
};
