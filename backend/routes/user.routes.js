import express from 'express'
import { Router } from 'express'
import { loginUser, logoutUser, RegisterUser } from '../controllers/User.controller.js'
import { verfyJWT } from '../middleware/authMiddleware.js'

const router = Router()

router.route('/register').post(RegisterUser)
router.route('/login').post(loginUser)
router.route('/logout').post(verfyJWT, logoutUser)

export default router;