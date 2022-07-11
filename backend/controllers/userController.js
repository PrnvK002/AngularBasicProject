import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../model/user.js';
import { loginSchema , signupSchema } from '../validator/validation.js';
import generateToken from '../util/generateToken.js';
import { client } from '../config/twilio.js';

//@desc login check
//@route POST /login
//@access public

export const authLogin = asyncHandler(async (req,res)=>{
    console.log(req.body);
    const { email , password } = req.body;

    try{

        const result = await loginSchema.validateAsync(req.body);
        const user = await User.findOne({ email : email });

        if(!user){
            console.log(401);
            res.status(401);
            throw new Error('Invalid email Address');
        }
        if(user && (await user.matchPassword(password))){
            let username = user.firstName + user.lastName;
            res.status(200).json({
                _id: user._id,
                email: user.email,
                phone: user.phone,
                username ,
                authToken: generateToken(user._id),
              });
        } else {
            res.status(401);
            throw new Error("Invalid Email or password");
          }

    }catch(err){
        res.status(422);
        throw new Error('Please check your credentials');
    }
})

//@desc signup check
//@route POST /sendOtp
//@access public

export const sendOtp = asyncHandler(async (req,res) => {
    console.log(req.body);
    const {phone} = req.body;
    const user = await User.findOne({ phone });
    if (user) {
        res.status(400);
        throw new Error('User already exists');
    }
    try{
        const resp = await client.verify.services(process.env.TWILIO_SERVICE)
            .verifications
            .create({ to: `+91${phone}`, channel: 'sms' });
    
        console.log(resp);
        res.json({ message: 'OTP send' });
    }catch(err){
        console.log(err);
    }
});

//@desc signup check
//@route POST /signup
//@access public

export const authSignup = asyncHandler(async (req,res) => {

    try{
        const result = await signupSchema(req.body);
        const { phone } = req.body;
        const { status } = await client.verify.services(process.env.TWILIO_SERVICE)
        .verificationChecks
        .create({ to: `+91${phone}`, code: req.body.otp });
    
        if (status !== 'approved') {
            res.status(401);
            throw new Error('Invalid OTP');
        }
        let ecrypted = await bcrypt.hash(req.body.password, 10);
        const insert = await User.create({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            password : ecrypted,
            phone : phone,
            dob : req.body.dob
        });
        if(insert){
            res.status(200).json({ message : 'successfully registered user' });
        }else{
            res.status(422);
            throw new Error('Please retry after sometime');
        }
    }catch(err){
        res.status(422);
        throw new Error('Please check your credentials');
    }
});

//@desc profile data
//@route get /profile
//@access public

export const getProfileData = asyncHandler(async (req,res) => {
    let {id} = req.params;
    const user = await User.findOne({_id : id});
    if(user){
        res.status(200).json({ user });
    }
    res.status(404);
    throw new Error('Cannot find profile data');
})