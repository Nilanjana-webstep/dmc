import Joi from "joi";

export const ConsumerCreationValidationModel = Joi.object({
  
  property_no: Joi.string()
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
  
  pincode: Joi.number()
    .required(),
  
 
});


export const ConsumerUpdationValidationModel = Joi.object({
  
  property_no: Joi.string()
    .required(),
  
  street_1: Joi.string()
    .required(),
  
  street_2: Joi.string()
    .required(),
  
  billing_address : Joi.string()
    .required(),

  property_type : Joi.string()
    .required(),

  property_sub_type : Joi.string()
    .required(),

  ward_no : Joi.string()
    .required(),
  
  pincode: Joi.number()
    .positive()
    .required(),

  is_active : Joi.boolean()
    .required()
 
});
