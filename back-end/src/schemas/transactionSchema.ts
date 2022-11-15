import joi from "joi";

const transactionSchema = joi.object({
    username: joi.string().min(3).required(),
    value: joi.number().min(0).required()
});

export default transactionSchema;