import * as Joi from "joi";

export const create = Joi.object().keys({
    name: Joi.string().max(20).required(),
    email: Joi.string().max(20).required(),
});