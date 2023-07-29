import Joi from "joi";


const createUserSchema = Joi.object({
    username: Joi.string().max(200).required(),
    email: Joi.string().email().max(200).required(),
    password: Joi.string().max(200).required(),
    name: Joi.string().max(100).required(),
});

const loginSchema = Joi.object({
    username: Joi.string().max(200).required(),
    password: Joi.string().max(200).required(),
})

export {
    createUserSchema,
    loginSchema,
}