import Joi from "joi";

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string()
    .valid(
      "Men’s Wear",
      "Women’s Wear",
      "Kids’ Wear",
      "Bags & Purses",
      "Footwear",
      "Ankara Prints",
      "Kente Cloth",
      "Mud Cloth",
      "Adire",
      "Aso Oke",
      "Painted Clothing",
      "Printed Designs"
    )
    .required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).default(0),
  images: Joi.array().items(Joi.string()).min(1).required(),
});

export const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: "Validation error",
      details: error.details.map((detail) => detail.message),
    });
  }
  next();
};
