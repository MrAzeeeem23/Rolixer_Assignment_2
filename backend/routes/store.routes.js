import express, { Router } from 'express'
import { createStore, getAllStores, getStoreById, updateStore, deleteStoreById } from '../controllers/Store.controller.js'
import { authorizedAdmin, authorizedStoreOwner, verfyJWT } from '../middleware/authMiddleware.js'

const router = Router()

router.route("/").post(verfyJWT, authorizedStoreOwner, createStore).put(authorizedStoreOwner, updateStore)

router.route("/:id").delete(authorizedStoreOwner, deleteStoreById)

export default router;