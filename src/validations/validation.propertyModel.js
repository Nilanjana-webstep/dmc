import Joi from "joi";

export const PropertyCreationValidationModel = Joi.object({
  
  property_no: Joi.string()
    .required(),
  
  street_1: Joi.string()
    .required(),
  
  street_2: Joi.string()
    .optional(),
  
  customer_id : Joi.number()
    .required(),

  property_type_id : Joi.number()
    .required(),

  property_sub_type_id : Joi.number()
    .optional(),

  ward_id : Joi.number()
    .required(),
  
  pincode: Joi.string()
    .required(),
  
 
});


export const PropertyUpdationValidationModel = Joi.object({
  
  property_no: Joi.string()
    .optional(),
  
  street_1: Joi.string()
    .optional(),
  
  street_2: Joi.string()
    .optional(),
  
  customer_id : Joi.number()
    .optional(),

  property_type_id : Joi.number()
    .optional(),

  property_sub_type_id : Joi.number()
    .optional(),

  ward_id : Joi.number()
    .optional(),
  
  pincode: Joi.string()
    .optional(),
  is_active : Joi.boolean()
    .optional()
 
});
