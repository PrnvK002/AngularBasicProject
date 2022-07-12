import Joi from "joi";

export const loginSchema = Joi.object({

    email: Joi.string().email(),
    password: Joi.string().min(7)

});


export const signupSchema = Joi.object({

    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(7).required(),
    confirmPassword: Joi.ref("password"),
    email: Joi.string().email().required(),
    phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),

    dob: Joi.string().required(),
    otp: Joi.string().required()

});
