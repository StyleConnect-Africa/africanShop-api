import Joi from "joi";
const validateRegister =(req,rest,next)=>{
    const schema =Joi.object({
        name:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(8).required(),
        phoneNo:Joi.string().required(),
        role:Joi.string().valid('user','admin').required(),
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
export {validateLogin,validateRegister}