import Joi from "joi";

const categoryMapping = {
  "Clothing": ["Men’s Wear", "Women’s Wear", "Kids’ Wear"],
  "Accessories": ["Jewelry", "Headwear", "Bags & Purses", "Footwear"],
  "Fabric & Materials": [
    "Ankara Prints",
    "Kente Cloth",
    "Mud Cloth",
    "Adire",
    "Aso Oke",
  ],
  "Art Wear": ["Painted Clothing", "Printed Designs"],
  "Crafts & Gifts": ["Handmade Crafts", "Gift Sets", "Cultural Souvenirs"],
};

const validateProduct = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string()
      .valid(...Object.keys(categoryMapping))
      .required(),
    subcategory: Joi.string()
      .required()
      .custom((value, helpers) => {
        const category = req.body.category;
        if (
          !categoryMapping[category] ||
          !categoryMapping[category].includes(value)
        ) {
          return helpers.message(
            `"${value}" is not a valid subcategory for "${category}"`
          );
        }
        return value;
      }),
    price: Joi.number().positive().required(),
    stock: Joi.number().integer().min(0).optional(),
    vendor: Joi.string().required(), // Assuming vendor is passed as a string ID
    images: Joi.array().items(Joi.string().uri()).optional(),
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

export { validateProduct };
