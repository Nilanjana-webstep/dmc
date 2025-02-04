import Joi from 'joi';

export const CustomerCreationValidationModel = Joi.object({

  full_name: Joi.string()
    .required(),
  
  mobile_number: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .message("invalid phone number") 
    .required(),
  
  date_of_birth: Joi.date()
    .required(),
  
  gender: Joi.string()
    .valid('male', 'female', 'other')
    .required(),

  address : Joi.string()
    .required()

});




export const CustomerUpdationValidationModel = Joi.object({
  
  full_name: Joi.string()
    .required(),
    
  email: Joi.string()
    .email()
    .required(),
  
  date_of_birth: Joi.date()
    .required(),
  
  sex: Joi.string()
    .valid('male', 'female', 'other')
    .required(),

  address : Joi.string()
    .required(),

  is_active : Joi.boolean()
    .required()
  

});
