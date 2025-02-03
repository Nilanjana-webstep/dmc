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
    .optional(),
    
  email: Joi.string()
    .email()
    .optional(),
  
  date_of_birth: Joi.date()
    .optional(),
  
  sex: Joi.string()
    .valid('male', 'female', 'other')
    .optional(),

  address : Joi.string()
    .optional(),

  is_active : Joi.boolean()
    .optional()
  

});
