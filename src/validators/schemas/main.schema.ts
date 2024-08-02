import Joi from 'joi';

const validateBodySchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'Field "name" must be string',
        'any.required': 'Field "name" is required'
    }),
    price: Joi.number().positive().required().messages({
        'number.base': 'Field "price" must be numeric',
        'number.positive': 'Field "price" cannot be negative',
        'any.required': 'Field "price" is required'
    })
});

const validateIdSchema = Joi.object({
    id: Joi.number().required()
});

export { validateBodySchema, validateIdSchema }