import Joi from 'joi';

export const CustomerCreationValidationModel = Joi.object({
  full_name: Joi.string()
    .required(),
  
  mobile_number: Joi.number() 
    .positive()
    .message("invalid phone number") 
    .required(),
  
  email: Joi.string()
    .email()
    .optional(),
  
  date_of_birth: Joi.date()
    .required(),
  
  sex: Joi.string()
    .valid('male', 'female', 'other')
    .required(),
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
  

});
