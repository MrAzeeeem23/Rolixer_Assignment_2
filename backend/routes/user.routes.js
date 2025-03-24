import express from "express";
import { Router } from "express";
import {
  loginUser,
  logoutUser,
  RegisterUser,
  getAllUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} from "../controllers/User.controller.js";
import { authorizedAdmin, verfyJWT } from "../middleware/authMiddleware.js";

const router = Router();


router.route("/register").post(RegisterUser);
router.route("/login").post(loginUser);

router.route("/logout").post(verfyJWT, logoutUser);
router.route("/profile").get(verfyJWT, getUserDetails); 
router.route("/profile/update").put(verfyJWT, updateUser); 

router.route("/users").get(verfyJWT, authorizedAdmin, getAllUsers); 
router.route("/user/:id").delete(verfyJWT, authorizedAdmin, deleteUser); 
export default router;
