import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

const cookieopt = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 60 * 60 * 1000, 
    }
export const setToken = (user) => {
    const token = jwt.sign(
        {
            role:user.role,
            userId: user._id,
            name:user.name,
        }, process.env.JWT_SECERET, {
        expiresIn: '1h'
    });

    return token;
};
export default cookieopt;
