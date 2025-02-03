import Joi from "joi";

export const PropertySubTypeCreationValidationModel = Joi.object({
  property_sub_type: Joi.string()
    .required(),

  charge : Joi.number()
    .required(),

  property_type_id : Joi.number()
    .required(),
  
});


export const PropertySubTypeUpdationValidationModel = Joi.object({
  property_sub_type: Joi.string()
    .optional(),

  property_type_id : Joi.number()
    .optional(),

  charge : Joi.number()
    .optional(),
  
  is_active: Joi.boolean()
    .optional()
});


export const PropertySubTypeCreationValidationModelForCsv = Joi.object({
  property_sub_type: Joi.string()
    .required(),

  property_type: Joi.string()
    .required(),
  
});



