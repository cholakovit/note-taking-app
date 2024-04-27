
import express from 'express'
import UserController from '../controllers/userController'

export const userRouter = express.Router()

const user = new UserController()


userRouter.route('/login').post(user.login);
userRouter.route('/create-user').post(user.createUser);