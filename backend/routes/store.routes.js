import express, { Router } from "express";
import {
  createStore,
  getAllStores,
  getStoreById,
  updateStore,
  deleteStoreById,
  getFilteredStores
} from "../controllers/Store.controller.js";
import { authorizedAdmin, authorizedStoreOwner, verfyJWT } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/")
  .post(verfyJWT, authorizedStoreOwner, createStore)
  .get(getAllStores); 

router.route("/search").get(getFilteredStores);

router.route("/:id").get(getStoreById);

router.route("/:id")
  .put(verfyJWT, authorizedStoreOwner, updateStore) 
  .delete(verfyJWT, authorizedStoreOwner, deleteStoreById); 

export default router;
