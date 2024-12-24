import Joi from 'joi';

export const orderBodySchema = Joi.object({
  products: Joi.array()
    .items({
      id: Joi.number().positive().required().messages({
        'any.required': 'product id is required',
        'number.positive': "product id doesn't exist",
      }),
      quantity: Joi.number().positive().required().messages({
        'any.required': 'product quantity is required',
        'number.positive': "product quantity can't be in negative",
      }),
    })
    .required(),
});

export const orderParamsSchema = Joi.object({
  orderId: Joi.number().required().messages({
    'any.required': 'order id is required',
  }),
});

// export const orderQuery = Joi.object({
//   status: Joi.string().regex(/^complete$|^active$/),
//   page: Joi.number().positive().integer(),
// });
