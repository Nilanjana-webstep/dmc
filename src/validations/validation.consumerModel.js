import Joi from "joi";

export const ConsumerCreationValidationModel = Joi.object({
  
  property_no: Joi.string()
    .required(),
  
  street_1: Joi.string()
    .required(),
  
  street_2: Joi.string()
    .optional(),

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
    .optional(),
  
  street_1: Joi.string()
    .optional(),
  
  street_2: Joi.string()
    .optional(),
  
  billing_address : Joi.string()
    .optional(),

  property_type : Joi.string()
    .optional(),

  property_sub_type : Joi.string()
    .optional(),

  ward_no : Joi.string()
    .optional(),
  
  pincode: Joi.number()
    .positive()
    .optional(),

  is_active : Joi.boolean()
    .optional()
 
});
