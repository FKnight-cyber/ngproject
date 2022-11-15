import joi from "joi";

const signSchema = joi.object({
    username: joi.string().min(3).required(),
    password: joi.string()
    .pattern(new RegExp("(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[A-Z])(?=.*[0-9]).*$"))
    .min(8)
    .required()
});

export default signSchema;
