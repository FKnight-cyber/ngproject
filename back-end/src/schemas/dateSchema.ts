import joi from "joi";

const dateSchema = joi.object({
    date: joi.date().raw().required()
});

export default dateSchema;