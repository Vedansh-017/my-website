// import jwt from 'jsonwebtoken';

// const auth = (req, res, next) => {
//     try {
//         const token = req.headers.authorization; // Get token from Authorization header
//         if (!token) {
//             return res.status(401).json({ success: false, message: "Unauthorized access" });
//         }

//         // Verify the token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; // Attach user info to request object
//         next(); // Proceed to the next middleware or route handler
//     } catch (error) {
//         res.status(401).json({ success: false, message: "Invalid token" });
//     }
// }

// export default auth;





import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';        

dotenv.config();
const auth = (req, res, next) => {
        const token = req.headers.authorization // Get token from Authorization header
        
        try {
       jwt.verify(token, process.env.JWT_SECRET);
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid token" });
    }
}
export default auth;