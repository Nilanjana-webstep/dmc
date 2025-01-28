import Joi from "joi";

export const PropertyTypeCreationValidationModel = Joi.object({

  property_type: Joi.string()
    .required(),
  
});

export const PropertyTypeUpdationValidationModel = Joi.object({

  property_type: Joi.string()
    .optional(),

  is_active : Joi.boolean()
    .optional()
  
});
