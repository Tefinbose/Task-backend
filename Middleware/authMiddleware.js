import jwt from "jsonwebtoken";

const authMiddleware = (req,res,next)=>{
    try{
        // Get tokens from the headers
        const token = req.header("Authorization");
        
        if(!token) return res.status(401).json({message:"No token access denied"})
            // Verify token 
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        // Attach the user id to request
        req.user = decoded;
        
        next() //Move to the controller
    }catch(error){
        res.status(401).json({message:"invalid token"})
    }
}

export default authMiddleware