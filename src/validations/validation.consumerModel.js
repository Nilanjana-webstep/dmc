import Joi from "joi";

export const ConsumerCreationValidationModel = Joi.object({
  
  property_no: Joi.string()
    .required(),
  
  property_size : Joi.number()
    .positive()
    .message('invalid property size.')
    .required(),
  
  street_1: Joi.string()
    .required(),
  
  street_2: Joi.string()
    .required(),

  billing_address : Joi.string()
    .required(),

  property_type_id : Joi.number()
    .required(),

  property_sub_type_id : Joi.number()
    .required(),

  ward_id : Joi.number()
    .required(),

  borough_id : Joi.number()
    .required(),

  billing_profile_id : Joi.number()
    .required(),
    
  pincode: Joi.number()
    .required(),
  
 
});


export const ConsumerUpdationValidationModel = Joi.object({
  
  property_no: Joi.string()
    .required(),
  
  property_size : Joi.number()
    .positive()
    .message('invalid property size.')
    .required(),
  
  street_1: Joi.string()
    .required(),
  
  street_2: Joi.string()
    .required(),

  billing_address : Joi.string()
    .required(),

  property_type_id : Joi.number()
    .required(),

  property_sub_type_id : Joi.number()
    .required(),

  ward_id : Joi.number()
    .required(),
  
  borough_id : Joi.number()
    .required(),

  billing_profile_id : Joi.number()
    .required(),
    
  pincode: Joi.number()
    .required(),
 
});
