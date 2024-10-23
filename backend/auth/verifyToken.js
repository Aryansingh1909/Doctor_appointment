// import jwt from 'jsonwebtoken';
// import Doctor from '../models/DoctorSchema.js';
// import User from '../models/UserSchema.js';

// export const authenticate =async(req,res,next)=>{
//     //get token from headers
//     const authToken=req.headers.authorization;
// console.log("token auth :",authToken)
//     // bearer actual token
//     // check if token exists or not
//     if(!authToken || !authToken.startsWith("Bearer")){  
//         return res.status(401).json({success:false,message:"No token,authorization denied."});
//     }

//     try {
//             // console.log(authToken);
//             const token=authToken.split(" ")[1];
//             console.log("token:",token)
//             console.log("sh hai yaha1")
//             // verify token
//             const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
//             console.log("sh hai yaha2")
//             req.userId=decoded.id;
//             req.role=decoded.role;
//             console.log("sh hai yaha3")

//             // must call the next function
//             next(); 
//     } catch (err) {
//         if(err.name=="TokenExpiredError"){
//             return res.status(401).json({message:"token is expired"});
//         }
//         console.log("error:",err)
//         return res.status(401).json({success:false,message:"invalid token"});
//     }
// };

// export const restrict=roles=> async(req,res,next)=>{
//     const userId=req.userId;
//     let user;
//     const patient=await User.findById(userId);
//     const doctor=await Doctor.findById(userId);

//     if(patient){
//         user=patient;
//     }
//     if(doctor){
//         user=doctor;
//     }
    
//     if(!roles.includes(user.role)){
//         return res.status(401).json({success:false,message:"you are not authorized (vt.js)"});
//     }
//     next();

// };



import jwt from 'jsonwebtoken';
import Doctor from '../models/DoctorSchema.js';
import User from '../models/UserSchema.js';

export const authenticate = async (req, res, next) => {
    // Get token from headers
    const authToken = req.body.authorization||req.headers.authorization;
    console.log("Token auth:", authToken);

    // Check if the token exists and starts with "Bearer"
    if (!authToken || !authToken.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "No token, authorization denied." });
    }

    try {
        // Extract the token (removing 'Bearer ')
        const token = authToken.split(" ")[1];
        console.log("Token:", token);

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded token:", decoded);

        // Add user ID and role to request object
        req.userId = decoded.id;
        req.role = decoded.role;

        // Proceed to the next middleware
        next(); 
    } catch (err) {
        // Handle specific token expiration error
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Token is expired." });
        }
        console.log("Error verifying token:", err);
        return res.status(401).json({ success: false, message: "Invalid token." });
    }
};

export const restrict = roles => async (req, res, next) => {
    try {
        const userId = req.userId;

        // Fetch the user based on their role (could be Doctor or Patient/User)
        let user = await User.findById(userId) || await Doctor.findById(userId);

        // If user is not found
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Check if the user's role is allowed
        if (!roles.includes(user.role)) {
            return res.status(403).json({ success: false, message: "You are not authorized." });
        }

        // Proceed to the next middleware
        next();
    } catch (error) {
        console.error("Authorization error:", error);
        res.status(500).json({ success: false, message: "Server error." });
    }
};
