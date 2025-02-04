import Joi from 'joi';

export const CustomerConsumerCombinModel = Joi.object({
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

    address : Joi.string()
      .required(),
  
    Consumer_no: Joi.string()
      .required(),
    
    street_1: Joi.string()
      .required(),
    
    street_2: Joi.string()
      .optional(),
  
    property_type : Joi.string()
      .required(),
  
    property_sub_type : Joi.string()
       .required(),
  
    ward_no : Joi.number()
      .required(),
    
    pincode: Joi.number()
      .required(),
    
    billing_address : Joi.string()
      .required(),
    
});
