import Joi from 'joi';

export const CustomerPropertyCombinModel = Joi.object({
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
  
    property_no: Joi.string()
      .required(),
    
    street_1: Joi.string()
      .required(),
    
    street_2: Joi.string()
      .optional(),
  
    property_type_name : Joi.string()
      .required(),
  
    property_sub_type_name : Joi.string()
      .optional(),
  
    ward_no : Joi.number()
      .required(),
    
    pincode: Joi.number()
      .required(),
    
});
