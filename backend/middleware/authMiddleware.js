import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import User from "../models/User.js";

const verfyJWT = async(req, res, next) => {
    try {

        const token = req.cookies.accesstoken || req.header("Authorization")?.replace("Bearer ", "")
        
        if(!token) return res.status(401).json({ message: "Unauthorized"})
        
        const decodedToken = jwt.verify(token, process.env.JWT_ACCESSTOKEN_KEY)
        console.log(decodedToken.id)

        const user = await User.findByPk(decodedToken?.id)

        if(!user){
            throw new Error("User Not Found")
        }
        req.user = user;
        next()
    } catch (error) {
        // throw new res.status(401).json({
        //     message: "Invalid token"
        // })
        console.error(error)
    }
}

const authorizedAdmin = async (req, res, next) => {
    try {

        if(req.user && req.user.role === "admin"){
            next()
        }

    } catch (error) {
        res.status(403).json({ message: "Not Authorized as admin" });
    }
}

const authorizedStoreOwner = async (req, res, next) => {
    try {
        if(req.user && req.user.role === "store_owner"){
            next();
        }
    } catch (error) {
        res.status(403).json({ message: "Not Authorized as store_owner" });
    }
}

export {
    verfyJWT,
    authorizedAdmin,
    authorizedStoreOwner
}