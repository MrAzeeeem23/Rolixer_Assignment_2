import express, { Router } from "express";
import {
  RegisterUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/User.controller.js";

import {
  authorizedAdmin,
  authorizedStoreOwner,
  verfyJWT,
} from "../middleware/authMiddleware.js";

import {
  getAllStores,
  deleteStoreById,
} from "../controllers/Store.controller.js";


const router = Router();

router.get("/admin/dashboard", verfyJWT, authorizedAdmin, async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();

    res.json({ totalUsers, totalStores, totalRatings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/admin/add-user", verfyJWT, authorizedAdmin, RegisterUser);
router.get("/admin/users", verfyJWT, authorizedAdmin, getAllUsers);
router.get("/admin/users/filter", verfyJWT, authorizedAdmin, getFilteredUsers);
router.get("/admin/users/:id", verfyJWT, authorizedAdmin, getUserById);
router.put("/admin/users/:id", verfyJWT, authorizedAdmin, updateUser);
router.delete("/admin/users/:id", verfyJWT, authorizedAdmin, deleteUser);

router.get("/admin/stores", verfyJWT, authorizedAdmin, getAllStores);
router.get(
  "/admin/stores/filter",
  verfyJWT,
  authorizedAdmin,
  getFilteredStores
);

router.route("/:id").delete(authorizedStoreOwner, deleteStoreById);

export default router;
