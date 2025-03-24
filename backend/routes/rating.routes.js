import express, { Router } from "express";
import {
  submitRating,
  updateRating,
  getStoreRatings,
  getUserRating,
  deleteRating
} from "../controllers/Rating.controller.js";
import { verfyJWT } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").post(verfyJWT, submitRating);

router.route("/:storeId").put(verfyJWT, updateRating);

router.route("/store/:storeId").get(getStoreRatings);

router.route("/user/:storeId").get(verfyJWT, getUserRating);

router.route("/:storeId").delete(verfyJWT, deleteRating);

export default router;
