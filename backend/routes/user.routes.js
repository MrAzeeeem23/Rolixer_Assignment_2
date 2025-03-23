import express from 'express'
import { Router } from 'express'
import { loginUser, logoutUser, RegisterUser, getAllUsers } from '../controllers/User.controller.js'
import { authorizedAdmin, verfyJWT } from '../middleware/authMiddleware.js'

const router = Router()

router.route('/register').post(RegisterUser)
router.route('/login').post(loginUser)
router.route('/logout').post(verfyJWT, logoutUser)
router.route('/allusers').get(verfyJWT, authorizedAdmin, getAllUsers)

export default router;