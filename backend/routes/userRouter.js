import { Router } from 'express';
import { authLogin , authSignup , sendOtp , getProfileData } from '../controllers/userController.js';
import authenticationMiddleware from '../middlewares/authentication.js';

const router = Router();

//@desc login check
//@route POST /login
//@access public

router.post('/login',authLogin);

//@desc signup check
//@route POST /signup
//@access public

router.post('/register',authSignup);

//@desc signup check
//@route post /sendOtp/${phone}
//@access public

router.post('/sendOtp',sendOtp);

//@desc profile data
//@route get /profile
//@access public

router.get('/profile/:id',authenticationMiddleware,getProfileData);


export default router;

