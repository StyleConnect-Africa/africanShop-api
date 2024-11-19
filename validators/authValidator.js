import Joi from "joi";
import {check,validationResult} from "express-validator";
const validateRegister =(req,rest,next)=>{

    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      phoneNo: Joi.string().required(),
      role: Joi.string().valid("user", "vendor").required(),
      storeName: Joi.string().when("role", {
        is: "vendor",
        then: Joi.required(),
      }),
      businessEmail: Joi.string()
        .email()
        .when("role", { is: "vendor", then: Joi.required() }),
      businessPhoneNo: Joi.string().when("role", {
        is: "vendor",
        then: Joi.required(),
      }),
      storeName: Joi.string().when("role", {
        is: "vendor",
        then: Joi.required(),
      }),
    });
    const {error}=schema.validate(req.body);
    if(error) return rest.status(400).json({
        message:error.details[0].message
    })
    next()
}
const validateLogin=(req,res,next)=>{
    const schema = Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(8).required(),
    })
    const {error}=schema.validate(req.body);
    if(error) return res.status(400).json({
        message:error.details[0].message
    })
    next();
}
const validateStoreUpdate = [
  check("storeName")
    .optional()
    .notEmpty()
    .withMessage("Store name cannot be empty"),
  check("storeLocation")
    .optional()
    .notEmpty()
    .withMessage("Store location cannot be empty"),
  check("businessPhoneNo")
    .optional()
    .notEmpty()
    .withMessage("Business phone number cannot be empty"),
  check("businessEmail")
    .optional()
    .isEmail()
    .withMessage("Valid business email is required"),
  check("storeDescription")
    .optional()
    .notEmpty()
    .withMessage("Store description cannot be empty"),
  check("operatingHours")
    .optional()
    .notEmpty()
    .withMessage("Operating hours cannot be empty"),
  check("socialMediaLinks")
    .optional()
    .isObject()
    .withMessage("Social media links must be an object"),
  check("storePolicies")
    .optional()
    .notEmpty()
    .withMessage("Store policies cannot be empty"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
const validateUserUpdate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phoneNo: Joi.string().optional(),
    // Add other fields as necessary
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
 const profilePictureValidator = (req, res, next) => {
  const userRole = req.user.role; // Assuming req.user is set by authMiddleware

  if (userRole === "vendor" && !req.file) {
    return res
      .status(400)
      .json({ message: "Profile picture is required for vendors." });
  }

  next();
};
export { validateLogin, validateRegister, validateStoreUpdate, validateUserUpdate,profilePictureValidator };
