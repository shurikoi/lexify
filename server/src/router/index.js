import express from "express"
import { signIn, checkUser, createUser } from "../controllers/userController.js"

const router = express.Router()

router.post('/check-user', checkUser)
router.post('/sign-in', signIn)
router.post('/create-user', createUser)
router.post('/refresh') // TODO

export default router