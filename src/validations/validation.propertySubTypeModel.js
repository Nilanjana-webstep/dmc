import Joi from "joi";

export const PropertySubTypeCreationValidationModel = Joi.object({
  property_sub_type_name: Joi.string()
    .required(),

  property_type_name: Joi.string()
    .required(),
  
});


export const PropertySubTypeUpdationValidationModel = Joi.object({
  property_sub_type_name: Joi.string()
    .optional(),

  property_type_name: Joi.number()
    .optional(),
  
  is_active: Joi.boolean()
    .optional()
});
