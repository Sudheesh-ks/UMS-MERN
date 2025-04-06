import jwt from "jsonwebtoken";
import { httpStatus } from "../constants/httpStatus.js";

export const authenticateJWT = (req, res, next) => {
    console.log(req.headers);
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(httpStatus.UNAUTHORIZED).json({ message: 'Token Not Provided' });
        return;
    }
    
    const token = authHeader.split(" ")[1].replace(/"/g, "");
    console.log(token);
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        if (err instanceof Error) {
            res.status(httpStatus.FORBIDDEN).json({ message: err.message });
        } else {
            res.status(httpStatus.FORBIDDEN).json({ message: 'Invalid or Expired token' });
        }
        return;
    }
};
