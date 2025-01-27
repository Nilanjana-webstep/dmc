import Joi from "joi";

export const PropertyTypeCreationValidationModel = Joi.object({

  property_type_name: Joi.string()
    .required(),
  
});

export const PropertyTypeUpdationValidationModel = Joi.object({

  property_type_name: Joi.string()
    .optional(),

  is_active : Joi.boolean()
    .optional()
  
});
