import Joi from "joi";

export const PropertySubTypeCreationValidationModel = Joi.object({
  sub_type_name: Joi.string()
    .required(),

  property_type_id: Joi.number()
    .required(),
  
});


export const PropertySubTypeUpdationValidationModel = Joi.object({
  sub_type_name: Joi.string()
    .optional(),

  property_type_id: Joi.number()
    .optional(),
  
  is_active: Joi.boolean()
    .optional()
});
