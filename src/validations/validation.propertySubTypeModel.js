import Joi from "joi";

export const PropertySubTypeCreationValidationModel = Joi.object({
  property_sub_type: Joi.string()
    .required(),

  property_type: Joi.string()
    .required(),
  
});


export const PropertySubTypeUpdationValidationModel = Joi.object({
  property_sub_type: Joi.string()
    .optional(),

  property_type: Joi.number()
    .optional(),
  
  is_active: Joi.boolean()
    .optional()
});
