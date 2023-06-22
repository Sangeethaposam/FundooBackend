import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth,resetAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.get('', userController.getAllUsers);

//route to create a new user
router.post('', userController.registerUser);

//route to login a new user
router.post('/login', userController.loginUser);

//route to forgot password
router.post('/forgotpassword', userController.forgotPassword);

//route to reset password
router.post('/resetpassword/:_id',resetAuth, userController.resetPassword);

export default router;
