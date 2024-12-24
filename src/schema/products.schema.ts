import Joi from 'joi';

const productBodySchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  category: Joi.string().min(3).max(30).required(),
  price: Joi.number().positive().required().messages({
    'any.required': 'Product price is required',
    'number.positive': 'Product price must be positive',
  }),
});

const productParamsSchema = Joi.object({
  productId: Joi.number().required(),
});

export { productBodySchema, productParamsSchema };
