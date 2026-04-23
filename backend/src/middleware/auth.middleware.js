import jwt from "jsonwebtoken";
import User from "../models/User.js";


// protect routes by verifying the JWT
const protectRoute = async(req,res, next) =>{

    try {

        // extract token from header
        // removes bearer to get raw 
        const token = req.header("Authorization").replace("Bearer ","");

        // If no token provided then just block
        if(!token){

            return res.status(401).json({ message: "No authentication token, access denied" });

        }

        // verify token using key
        // If token is expired or tampered with then throw error
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        // find user in DB using the ID but dont carry hashed password
        const user = await User.findById(decoded.userId).select("-password");

        // If token is valid but user doesnt exist in DB
        if(!user){

            return res.status(401).json({ message: "Token is not valid" });
        
        }


        // Attach user data to request object 
        // allows route handlers to know who making request
        req.user = user;

        // Move to the next middlewareor controller function
        next();
        
    } catch (error) {

        // Log error for debugging
        console.error("Authentication error:", error.message);

        // Return 401 unauthorized for verification failures
        res.status(401).json({ message: "Token is not valid" });
        
    }
};

export default protectRoute