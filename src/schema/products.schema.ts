import Joi from 'joi';

const productBodySchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  category: Joi.string().min(3).max(30),
  price: Joi.number(),
}).or('name', 'category', 'price');

const productParamsSchema = Joi.object({
  productId: Joi.number().required(),
});

export { productBodySchema, productParamsSchema };
