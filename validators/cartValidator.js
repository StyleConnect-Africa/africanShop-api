// validators/cartValidator.js
import Joi from "joi";
import mongoose from "mongoose";

export const validateAddToCart = (req, res, next) => {
  const schema = Joi.object({
    productId: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.error("any.invalid", { value });
        }
        return value;
      })
      .required()
      .messages({
        "any.invalid": '"productId" must be a valid ObjectId',
      }),
    quantity: Joi.number().integer().min(1).required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: "Validation error",
      details: error.details.map((detail) => detail.message),
    });
  }
  next();
};
