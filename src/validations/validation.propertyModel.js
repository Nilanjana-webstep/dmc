import Joi from "joi";

export const PropertyCreationValidationModel = Joi.object({
  
  property_no: Joi.string()
    .required(),
  
  street_1: Joi.string()
    .required(),
  
  street_2: Joi.string()
    .optional(),

  billing_address : Joi.string()
    .required(),

  property_type : Joi.string()
    .required(),

  property_sub_type : Joi.string()
    .allow(null,'')
    .optional(),

  ward_no : Joi.number()
    .required(),
  
  pincode: Joi.number()
    .required(),
  
 
});


export const PropertyUpdationValidationModel = Joi.object({
  
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
